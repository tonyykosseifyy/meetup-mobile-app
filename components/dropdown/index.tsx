import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { ListDataSelected, BaseData } from "./react-native-simple-dropdown-select/src/types";
import { DropDownSelect } from "./react-native-simple-dropdown-select/src/index";
import { ListData } from "./react-native-simple-dropdown-select/src/types";
import { DropdownProps, Item } from "./types";

const Dropdown = ({ onValueChange, items, defaultValue }: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<ListDataSelected | null>(null);

  /* Format data for dropdown */
  const dropdownData = items?.map(i => ({
    id: typeof i.id === 'string' ? parseInt(i.id, 10) || 0 : i.id as number,
    name: i.name,
    value: i.name
  })) ?? [];
  
  useEffect(() => {
    if (defaultValue && items) {
      const defaultItem = dropdownData.find(item => 
        item.id === (typeof defaultValue === 'string' ? parseInt(defaultValue, 10) || 0 : defaultValue)
      );
      if (defaultItem) {
        setValue({
          ...defaultItem,
          value: defaultItem.name
        } as ListDataSelected);
      }
    }
  }, [defaultValue, items]);

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