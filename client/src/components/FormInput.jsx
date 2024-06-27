import { MenuItem, Select } from "@mui/material";

const FormInput = ({ value, name, onChange, options, label }) => {
  return (
    <div className="w-full sm:w-[23vw]">
      <label className="text-gray-500 ml-1 sm:text-[15px] ">{label}</label>
      <Select
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        displayEmpty
        sx={{
          ".MuiSelect-select": {
            paddingBlock: "14px",
          },
          marginTop: "3px",
        }}
        inputProps={{ "aria-label": "Without label" }}
        style={{ borderRadius: "9px" }}
      >
        {options.map((val, index) => (
          <MenuItem
            key={index}
            value={val.value}
            style={{ paddingBlock: "10px" }}
          >
            {val.label}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default FormInput;
