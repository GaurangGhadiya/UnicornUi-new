import React from 'react';
import { IoMdClose } from 'react-icons/io';
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';

const DropDown = ({
  dropdownOpen,
  toggle,
  categoryValue,
  array,
  onClick,
  multiple,
  removeSoftware,
  placeholder,
  isExplore
}: any) => {
  window.console.log(
    '🚀 ~ file: DropDown.tsx ~ line 19 ~ softwareValue2 ',
    categoryValue
  );
  return (
    <>
      <Dropdown isOpen={dropdownOpen} toggle={toggle}>
        {multiple ? (
          <DropdownToggle
            caret
            // style={{
            //   height: `${categoryValue?.length > 3 ? 'auto' : '43px'}`
            // }}
            className={`d-flex  elipsis pr-21 ${
              categoryValue?.length > 0
                ? 'dropdown-toggle1 pt-6'
                : 'dropdown-toggle2'
            } ${
              categoryValue?.length > 2
                ? 'auto'
                : isExplore
                ? 'h-51px'
                : 'h-42px'
            } `}
          >
            {categoryValue?.length ? (
              categoryValue?.map((v: any, i: any) => (
                <div className={`${i > 1 ? 'outMulti' : 'outMulti'}`}>
                  <div className="sname"> {v?.innerHTML ?? v}</div>
                  <div
                    className="softwareClose"
                    onClick={() => removeSoftware(v)}
                  >
                    {/* <IoMdClose style={{ height: '15px', width: '15px' }} /> */}
                    ×
                  </div>
                </div>
              ))
            ) : (
              <div className="" style={{ color: '#a8a9ad' }}>
                {placeholder}
              </div>
            )}
          </DropdownToggle>
        ) : (
          <DropdownToggle caret>
            <div
              className={
                categoryValue?.toLowerCase()?.includes('select') &&
                't-placeholder'
              }
            >
              {categoryValue}
            </div>
          </DropdownToggle>
        )}

        <DropdownMenu id="style-1">
          {array?.length ? (
            array?.map((data: any) => {
              return (
                <DropdownItem
                  value={data?._id ?? data?.value ?? data?.subject}
                  onClick={onClick}
                >
                  {data?.name ?? data?.label ?? data?.subject}
                </DropdownItem>
              );
            })
          ) : (
            <DropdownItem>No Data Found</DropdownItem>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default DropDown;
