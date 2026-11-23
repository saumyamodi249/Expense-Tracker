import React from 'react';
import { Input } from 'antd';
import { FiSearch } from 'react-icons/fi';

export interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSearch,
  placeholder = 'Search anything...',
  className = '',
  disabled = false,
}) => {
  return (
    <div className={`relative max-w-md w-full ${className}`}>
      <Input
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        onPressEnter={(e) => onSearch?.((e.target as HTMLInputElement).value)}
        disabled={disabled}
        placeholder={placeholder}
        prefix={<FiSearch className="text-font-tertiary text-base mr-2 shrink-0" />}
        className="!rounded-full !bg-background-secondary !border-border hover:!border-primary/50 focus-within:!border-primary !py-2 !px-4 !text-font !text-sm placeholder:!text-font-tertiary shadow-2xs transition-all [&_input]:!bg-transparent [&_input]:!text-font"
        allowClear
      />
    </div>
  );
};

export default SearchBar;
