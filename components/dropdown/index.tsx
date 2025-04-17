import React, { useState } from "react";
import { View } from "react-native";
import { ListDataSelected } from "./react-native-simple-dropdown-select/src/types";
import { DropDownSelect } from "./react-native-simple-dropdown-select/src/index";
import { ListData } from "./react-native-simple-dropdown-select/src/types";
import { DropdownProps, Item } from "./types";

const Dropdown = ({ onValueChange, items }: DropdownProps) => {
  const [open, setOpen]   = useState(false);
  const [value, setValue] = useState<Item | null>(null);

  /* RNPickerSelect → DropDownSelect data format */
  const dropdownData = items?.map(i => ({
    id: i.id,
    name: i.name,
  })) ?? [];

  return (
    <View className="w-full">
      <DropDownSelect
       
        toggle={() => setOpen(!open)}
        open={open}
        selectedData={value as ListDataSelected}

        data={dropdownData as ListData[]}

        onSelect={data => {
          setValue(data);          
          setOpen(false);          
          onValueChange?.(data?.id ?? null);
        }}

        dropDownContainerStyle={{ maxHeight: 400, minWidth: 200, }}
        titleStyle={{ fontSize: 16, color: '#666666', fontWeight: 'medium', height: 30, textAlign: 'center' }}
        placeholder=" "
        label=" "
      />
    </View>
  );
};


export default Dropdown;