import React, {useEffect, useState } from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';

// const Label = styled('label')`
//   padding: 0 0 4px;
//   line-height: 1.5;
//   display: block;
// `;

const InputWrapper = styled('div')`
  width: 300px;
  border: 1px solid #000000;
  background-color: #ffffff;
  border-radius: 4px;
  padding: 1px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: left;

  &:hover {
    border-color: #40a9ff;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 40px;
    box-sizing: border-box;
    padding: 4px 6px;
    width: 0;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    margin: 0;
    outline: 0;
  }
`;

const Tag = styled(({ label, onDelete, ...props }) => (
  <div {...props}>
    <span>{label}</span>
    <CloseIcon onClick={onDelete} />
  </div>
))`
  display: flex;
  align-items: center;
  height: 24px;
  margin: 2px;
  line-height: 18px;
  background-color: #ffffff;
  border: 2px solid #2B64D2;
  border-radius: 38px;
  box-sizing: content-box;
  padding: 0 4px 0 10px;
  outline: 0;
  overflow: hidden;
  color:#2B64D2;

  &:focus {
    border-color: #40a9ff;
    background-color: #e6f7ff;
  }

  & span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  & svg {
    font-size: 14px;
    cursor: pointer;
    padding: 4px;
  }
`;

const Listbox = styled('ul')`
  width: 300px;
  margin: 2px 0 0;
  padding: 0;
  position: absolute;
  list-style: none;
  background-color: #fff;
  overflow: auto;
  max-height: 250px;
  border-radius: 4px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1;

  & li {
    padding: 5px 12px;
    display: flex;

    & span {
      flex-grow: 1;
    }

    & svg {
      color: transparent;
    }
  }

  & li[aria-selected='true'] {
    background-color: #fafafa;
    font-weight: 600;

    & svg {
      color: #1890ff;
    }
  }

  & li[data-focus='true'] {
    background-color: #e6f7ff;
    cursor: pointer;

    & svg {
      color: #000;
    }
  }
`;

// const choosingList = [[{ title: "English" },
// { title: "Nepali" },
// { title: "Hindi" },
// { title: "Spanish" },
// { title: "French" },
// { title: "Chinese" },
// { title: "Russian" },
// { title: "Portugese" },
// { title: "Inodnesian" },
// { title: "Italian" },
// { title: "Japanese" },
// { title: "Marathi" },
// { title: "Bengali" },
// { title: "Tamil" },
// { title: "Urdu" },
// { title: "Sewdish" },
// { title: "Korean" },
// { title: "Irish" },
// { title: "Finnish" },
// { title: "Dutch" },
// { title: "Romanian" },
// { title: "Slovak" },
// { title: "Ukrainian"}, ],
// [{ title: "Electrical"},
// { title: "Plumbing" },
// { title: "Carpentry" },
// { title: "Alarm Systems" },
// { title: "Roofing" },
// { title: "Painting" },
// { title: "Construction" },
// { title: "Others" }]]; 


export default function CustomizedHook(props) {  
  // const selected = props.information[props.type].map((value)=>{
  //   return {title:value}
  // })
  // const languages = all_languages.map((item)=>{
  //   return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
  // })
  // const services = service_types.map((item)=>{
  //   return {title:item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()}
  // })
  
  // const all_options = {'services':services, languages:languages}
  // const options_list = all_options[props.type]
  let selected_option;
  for (const option of props.options){
    if (option.title === props.selected){
  // debugger;
      selected_option = option;
    }
  }

  const {
    getRootProps,
    getInputProps,
    getTagProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
    value,
    focused,
    setAnchorEl,
  } = useAutocomplete({
    id: 'customized-hook-demo'+ props.options.length + props.type,
    multiple: true,
    options: props.options,
    getOptionLabel: (option) => option.title,
    defaultValue: [selected_option]
    // defaultValue: [choosingList[index][0]]
  });
  
  // if (props.options != options){
  //   debugger;
  //   setOptions(props.options)
  // }
  return (
    <NoSsr>
      <div >
        <div  {...getRootProps()}>
          {/* <Label {...getInputLabelProps()}>Customized hook</Label> */}
          <InputWrapper ref={setAnchorEl} style={{paddingLeft:25, width:228}} className={focused ? 'focused' : ''}>
            {value.map((option, index) => {
              const optionProps = getTagProps({ index })
              const currOnDelete = optionProps.onDelete;
              const newOnDelete = (event) =>{
                // debugger;
                currOnDelete(event);
                if ('type' in props){
                  const newArr = [...value]
                  newArr.splice(index,1)
                  props.information[props.type] = newArr.map(val=> val.title)
                  props.setInformation({...props.information});
                }
              }
              optionProps.onDelete = newOnDelete;
              return(<Tag label={option?option.title:'N/A'} {...optionProps} />
            )}
            )}

            <input {...getInputProps()} placeholder={props.placeholder}/>
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index })
              const currOnClick = optionProps.onClick;
              const newOnClick = (event) =>{
                currOnClick(event);
                if ('type' in props){
                  props.information[props.type] = [...value.map(val=> val.title), event.target.innerText]
                  props.setInformation({...props.information});
                }
              }
              optionProps.onClick = newOnClick
              return(<li {...optionProps}>
                <span>{option.title}</span>
                <CheckIcon fontSize="small" />
              </li>)
            })}
          </Listbox>
        ) : null}
      </div>
    </NoSsr>
  );
}
