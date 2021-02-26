/*
  Adapted to React from WAI-ARIA-Practises
  https://www.w3.org/TR/wai-aria-practices/examples/combobox/aria1.1pattern/listbox-combo.html
*/

import React, { useState, useRef, useEffect } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  List,
  ListItem,
  VisuallyHidden,
  Link as CHLink,
  Text,
} from '@chakra-ui/react';

import Link from 'next/link';

function Combobox({
  searchFn,
  shouldAutoSelect,
  onShow = () => {},
  onHide = () => {},
  onItemSelected,
}) {
  const [activeIndex, setActiveIndex] = useState(-1);
  const [resultsCount, setResultsCount] = useState(0);
  const [shown, setShown] = useState(false);
  const [results, setResults] = useState([]);

  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef();
  const listBoxRef = useRef();
  const comboboxRef = useRef();

  useEffect(() => {
    document.addEventListener('click', checkHide);
    return () => {
      document.removeEventListener('click', checkHide);
    };
  }, []);

  function checkKey(e) {
    let key = e.key;

    switch (key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'Escape':
      case 'Enter':
        e.preventDefault();
        return;
      default:
        updateResults(false);
    }
  }

  async function updateResults(shouldShowAll) {
    let rs = await searchFn(inputValue);

    if (!shouldShowAll && !inputValue) {
      setResults([]);
      setShown(false);
      return;
    }

    if (rs.length) {
      setResults(rs);

      if (shouldAutoSelect && i === 0) {
        setActiveIndex(0);
      }

      setResultsCount(rs.length);
      setShown(true);
      onShow();
    }
  }

  function setActiveItem(e) {
    if (e.key === 'Escape') {
      hideListBox();
      return;
    }

    if (resultsCount < 1) {
      return;
    }

    let activeItem;

    switch (e.key) {
      case 'ArrowUp': {
        if (activeIndex <= 0) {
          setActiveIndex(resultsCount - 1);
        } else {
          setActiveIndex((state) => (state -= 1));
        }
        break;
      }
      case 'ArrowDown': {
        if (activeIndex === -1 || activeIndex >= resultsCount - 1) {
          setActiveIndex(0);
        } else {
          setActiveIndex((state) => (state = state + 1));
        }

        break;
      }
      case 'Enter': {
        activeItem = getItemAt(activeIndex);
        selectItem(activeItem);
        return;
      }
      case 'Tab': {
        hideListBox();
        return;
      }
      default:
        return;
    }

    e.preventDefault();
  }

  function getItemAt(index) {
    let listItem = listBoxRef.current.querySelector(`#result-item-${index}`);

    return listItem?.querySelector('a');
  }

  function clickItem(e) {
    if (e.target && e.target.nodeName == 'LI') {
      selectItem(e.target);
    }
  }

  function selectItem(item) {
    if (item) {
      onItemSelected(results[activeIndex]);
      hideListBox();
    }
  }

  function checkShow(e) {
    updateResults(false);
  }

  function checkHide(e) {
    if (
      e.target === inputRef.current ||
      comboboxRef.current?.contains(e.target)
    ) {
      return;
    }
    hideListBox();
  }

  function hideListBox() {
    setShown(false);
    setActiveIndex(-1);
    setResultsCount(0);
    onHide();
  }

  return (
    <Box position="relative" width="full" maxW="sm">
      <FormControl
        className="input-group"
        width="full"
        role="combobox"
        aria-expanded={shown}
        aria-owns="ex1-listbox"
        aria-haspopup="listbox"
        id="combobox"
        ref={comboboxRef}
      >
        <VisuallyHidden>
          <FormLabel htmlFor="search" id="search-label">
            Search Products
          </FormLabel>
        </VisuallyHidden>
        <Input
          placeholder="Search Products"
          id="search"
          name="search"
          type="text"
          variant="unstyled"
          onChange={(e) => setInputValue(e.target.value)}
          ref={inputRef}
          value={inputValue}
          aria-autocomplete="list"
          aria-controls="listbox"
          aria-activedescendant={
            activeIndex ? `result-item-${activeIndex}` : ''
          }
          onKeyUp={checkKey}
          onKeyDown={setActiveItem}
          onFocus={checkShow}
        />
      </FormControl>
      <List
        display={shown ? 'block' : 'none'}
        position="absolute"
        width="full"
        background="#1A202B"
        aria-labelledby="search-label"
        role="listbox"
        id="listbox"
        aria-expanded={results.length}
        ref={listBoxRef}
        onClick={clickItem}
      >
        {results.map((item, index) => (
          <ListItem
            key={item.id}
            id={`result-item-${index}`}
            key={`result-item-${index}`}
            role="option"
            style={{
              background:
                activeIndex === index
                  ? 'rgba(255,255,255, 0.1)'
                  : 'transparent',
            }}
            padding="1rem"
            aria-selected={
              (shouldAutoSelect && index === 0) || activeIndex === index
            }
          >
            <CHLink as={Link} href={`/products/${item.id}`}>
              {item.name}
            </CHLink>
          </ListItem>
        ))}
        <ListItem
          padding="0.5rem 1rem"
          display="flex"
          justifyContent="flex-end"
        >
          <Text as="small" opacity="0.25">
            {`${resultsCount} product${resultsCount > 1 ? 's' : ''}`} found.
          </Text>
        </ListItem>
      </List>
    </Box>
  );
}

export default Combobox;

/* <label htmlFor="ex1-input" id="ex1-label" className="combobox-label">
        Choice 1 Fruit or Vegetable
      </label>
      <div className="combobox-wrapper">
        <div
          role="combobox"
          aria-expanded={shown}
          aria-owns="ex1-listbox"
          aria-haspopup="listbox"
          id="ex1-combobox"
          ref={comboboxRef}
        >
          <input
            type="text"
            aria-autocomplete="list"
            aria-controls="ex1-listbox"
            aria-activedescendant={
              activeIndex ? `result-item-${activeIndex}` : ''
            }
            id="ex1-input"
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ color: 'black' }}
            onKeyUp={checkKey}
            onKeyDown={setActiveItem}
            onFocus={checkShow}
            onBlur={checkSelection}
          />
        </div>
        <ul
          aria-labelledby="ex1-label"
          role="listbox"
          id="ex1-listbox"
          className="listbox"
          aria-expanded={results.length}
          ref={listBoxRef}
          style={{ color: 'black', display: shown ? 'block' : 'none' }}
          onClick={clickItem}
        >
          {results.map((result, index) => (
            <li
              id={`result-item-${index}`}
              key={`result-item-${index}`}
              role="option"
              style={{
                background: activeIndex === index ? 'blue' : 'transparent',
              }}
              aria-selected={
                (shouldAutoSelect && index === 0) || activeIndex === index
              }
            >
              {result}
            </li>
          ))}
        </ul>
      </div> */
