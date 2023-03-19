import { Tooltip } from "antd";
import { COMPANIES } from "src/template/constants/companies";

export function Companies() {
  return (
    <div className="flex items-center justify-between">
      {COMPANIES.map((company) => (
        <Tooltip key={company.id} title={company.name}>
          {company.icon}
        </Tooltip>
      ))}
    </div>
  );
}
