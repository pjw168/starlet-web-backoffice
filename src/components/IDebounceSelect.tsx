/* eslint-disable @typescript-eslint/no-explicit-any */
import { Select, SelectProps, Spin } from 'antd';
import { debounce } from 'lodash';
import { useMemo, useRef, useState } from 'react';

export interface Props<ValueType = any>
  extends Omit<SelectProps<ValueType | ValueType[]>, 'options' | 'children'> {
  fetchOptions: (search: string) => Promise<void>;
  debounceTimeout?: number;
  options: ValueType[];
}

export default function IDebounceSelect<
  ValueType extends {
    key?: string;
    label: React.ReactNode;
    value: string | number;
  } = any,
>({
  fetchOptions,
  debounceTimeout = 800,
  options,
  ...props
}: Props<ValueType>) {
  const [fetching, setFetching] = useState(false);
  const fetchRef = useRef(0);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value: string) => {
      fetchRef.current += 1;
      const fetchId = fetchRef.current;
      setFetching(true);

      fetchOptions(value).then(_newOptions => {
        if (fetchId !== fetchRef.current) {
          // for fetch callback order
          return;
        }

        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeout);
  }, [debounceTimeout, fetchOptions]);

  return (
    <Select
      showSearch
      filterOption={false}
      onSearch={debounceFetcher}
      notFoundContent={fetching ? <Spin size='small' /> : null}
      options={options}
      loading={fetching}
      {...props}
    />
  );
}
