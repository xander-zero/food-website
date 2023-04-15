import { useCallback, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { debounce, get, isString, omit } from "lodash";
import Highlight from "src/components/Highlight";

export default function useTableSearchColumn() {
  const [searches, setSearches] = useState({});
  const searchedColumns = Object.keys(searches);
  const searchInput = useRef(null);

  const handleSearch = debounce((selectedKeys, confirm, dataIndex) => {
    // confirm(false);
    setSearches((s) => ({
      ...s,
      [dataIndex]: selectedKeys[0]?.toLowerCase(),
    }));
    // afterFilterCallback?.();
  }, 400);

  const handleReset = (dataIndex /* clearFilters */) => {
    // clearFilters();
    setSearches((s) => omit(s, dataIndex));
  };

  const getColumnSearchProps = useCallback(
    (dataIndex, render) => {
      const _dataIndex = isString(dataIndex) ? dataIndex : dataIndex.join(".");
      return {
        filterDropdown: ({
          setSelectedKeys,
          selectedKeys,
          confirm,
          clearFilters,
        }) => {
          return (
            <div
              style={{
                padding: 8,
                width: "220px",
              }}
            >
              <Input.Search
                ref={searchInput}
                placeholder={`Search ${_dataIndex}`}
                value={selectedKeys[0]}
                onChange={(e) => {
                  const keys = e.target.value ? [e.target.value] : [];
                  setSelectedKeys(keys);
                  if (e.target.value === "") {
                    handleReset(_dataIndex, clearFilters);
                    handleSearch.cancel();
                    return;
                  }
                  handleSearch(keys, confirm, _dataIndex);
                }}
                onSearch={() => handleSearch(selectedKeys, confirm, _dataIndex)}
                allowClear
              />
            </div>
          );
        },

        filterIcon: (filtered) => {
          const isSelected = !!searches[_dataIndex];
          return (
            <SearchOutlined
              style={{
                color: isSelected ? "#1890ff" : "rgba(58,58,58,0.49)",
                transform: isSelected ? "scale(1.6)" : "scale(1.2)",
                transition: "all .6s",
              }}
            />
          );
        },

        onFilter: (value, record) => {
          return get(record, _dataIndex)
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase());
        },

        onFilterDropdownVisibleChange: (visible) => {
          if (visible) {
            setTimeout(() => searchInput.current?.select(), 100);
          }
        },

        render: (text, record) => {
          const search = searches[_dataIndex];
          const highlighted = search ? (
            <mark>
              <Highlight
                searchWords={[search]}
                autoEscape
                textToHighlight={text ? text.toString() : ""}
              />
            </mark>
          ) : (
            text
          );
          if (render) {
            return render(highlighted, record, search);
          }
          return highlighted;
        },
      };
    },
    [searches]
  );

  const rowClassName = (record) => {
    return searchedColumns.every((col) =>
      get(record, col)?.toString().toLowerCase().includes(searches[col])
    )
      ? ""
      : "hidden";
  };

  return { getColumnSearchProps, rowClassName, searchedColumns, searches };
}
