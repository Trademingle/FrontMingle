import React from 'react';
import useAutocomplete from '@material-ui/lab/useAutocomplete';
import NoSsr from '@material-ui/core/NoSsr';
import CheckIcon from '@material-ui/icons/Check';
import CloseIcon from '@material-ui/icons/Close';
import styled from 'styled-components';
import api from '../api/api';

const InputWrapper = styled('div')`
  border: 1px solid #aaaaaa;
  background-color: #ffffff;
  display: flex;
  flex-wrap: wrap;
  flex-direction: left;
  margin-top:10px;
  border-radius: 5px;
  &:hover {
    border-color: #000000;
  }

  &.focused {
    border-color: #40a9ff;
    box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  }

  & input {
    font-size: 14px;
    height: 50px;
    box-sizing: border-box;
    min-width: 30px;
    flex-grow: 1;
    border: 0;
    outline: 0;
    border-radius: 5px;
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
  line-height: 22px;
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

export default function CustomizedHook(props) {
    
  const generateOptions = (options) => {
    return options.map(function(item) {
      return {title: item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()};
    });
  }
  // const index = (props.type==="languageList") ? 0:1;
  const ChoosingList = (props.type==="languageList") ? generateOptions(api.languages): generateOptions(api.serviceTypes);
  const selected_option=generateOptions(props.selected);
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
    multiple: true,
    options: ChoosingList,
    getOptionLabel: (option) => option.title,
    defaultValue: selected_option
  });
  // const optionProps

  return (
    <NoSsr>
      <div >
        <div  {...getRootProps()}>
          {/* <Label {...getInputLabelProps()}>Customized hook</Label> */}
          <InputWrapper ref={setAnchorEl} style={{
            width:'500px',
             textAlign: 'left'
             }} className={focused ? 'focused' : ''}>
            {value.map((option, index) => (
              <Tag label={option.title} {...getTagProps({ index })} />
            ))}

            <input {...getInputProps()} placeholder="Choose from the list here.."/>
          </InputWrapper>
        </div>
        {groupedOptions.length > 0 ? (
          <Listbox {...getListboxProps()}>
            {groupedOptions.map((option, index) => {
              const optionProps = getOptionProps({ option, index })
              const currOnClick = optionProps.onClick;
              const newOnClick = (event) =>{
                currOnClick(event);
                // debugger;
                if ('type' in props){
                  props.information[props.type] = [...value.map(val=> val.title), event.target.innerText]
                  props.information[props.type] = [...new Set(props.information[props.type])] //keeping unique values in the array (removing duplicates)
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

// const choosingList=(props) => {
//   if (props.type==="serviceList"){
//     let i = 0;
//     let services = api.serviceTypes;
//     let tagsCount = services.length;
//     let tempTags = [];
//     while (i < tagsCount) {
//         tempTags.push({ title: services[i]});
//         i += 1;
//     };
//     return tempTags;
//   }
//   else{
//     let i = 0;
//     let services = api.languages;
//     let tagsCount = services.length;
//     let tempTags = [];
//     while (i < tagsCount) {
//         tempTags.push({ title: services[i]});
//         i += 1;
//     };
//     return tempTags;
//   }
// };
