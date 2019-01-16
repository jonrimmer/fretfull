import React, { ReactNode, useState, useRef, KeyboardEvent, useMemo } from 'react';
import './Listbox.scss';
import cn from 'classnames';
import { isStringArray } from './util';

export interface Option {
  label: string;
  value: any;
}

interface Props {
  options: any[];
  className?: string;
  value: any;
  onSelect: (value: any) => void;
}

export default React.memo(({ options, className, value, onSelect }: Props) => {
  const ulEl = useRef<HTMLUListElement>(null);
  const [moveUpDownEnabled, setMoveUpDownEnabled] = useState(false);
  const [moveButton, setMoveButton] = useState(null);
  const [keysSoFar, setKeysSoFar] = useState('');
  const [activeDescendant, setActiveDescendnt] = useState<string | null>(null);
  
  function focusItem(item: Element) {

  }

  function focusFirstItem() {
    if (ulEl.current) {
      const firstItem = ulEl.current.querySelector('[role="option"]');

      if (firstItem) {
        focusItem(firstItem);
      }
    }
  }

  function focusLastItem() {
    if (ulEl.current) {
      const itemList = ulEl.current.querySelectorAll('[role="option"]');

      if (itemList.length) {
        focusItem(itemList[itemList.length - 1]);
      }
    }
  }

  function setupFocus() {
    if (activeDescendant) {
      return;
    }

    focusFirstItem();
  }

  function moveUpItems() {

  }

  function moveDownItems() {

  }

  function toggleSelectItem(item: Element) {

  }

  function findItemToFocus(key: string): Element | null {
    if (!ulEl.current) {
      return null;
    }

    const itemList = ulEl.current.querySelectorAll('[role="option"]');
    let searchIndex = 0;

    if (keysSoFar) {
      for (let i = 0; i < keysSoFar.length; i++) {
        if (itemList[i].getAttribute('id') == activeDescendant) {
          searchIndex = 0;
        }
      }
    }

    const soFar = keysSoFar + key;

    return null;
  }

  function checkKeyPress(evt: KeyboardEvent) {
    const key = evt.key;
  
    if (!activeDescendant) {
      return;
    }

    let nextItem: Element | null = document.getElementById(activeDescendant);

    if (!nextItem) {
      return;
    }

    switch(key) {
      case 'PageUp':
      case 'PageDown':
        if (moveUpDownEnabled) {
          evt.preventDefault();

          if (key === 'PageUp') {
            moveUpItems();
          }
          else {
            moveDownItems();
          }
        }

        break;
      case 'ArrowUp':
      case 'ArrowDown':
        evt.preventDefault();

        if (moveUpDownEnabled && evt.altKey) {
          if (key === 'ArrowUp') {
            moveUpItems();
          }
          else {
            moveDownItems();
          }
          
          return;
        }

        if (key === 'ArrowUp') {
          nextItem = nextItem.previousElementSibling;
        }
        else {
          nextItem = nextItem.nextElementSibling;
        }

        if (nextItem) {
          focusItem(nextItem);
        }

        break;

      case 'Home':
        evt.preventDefault();
        focusFirstItem();
        break;
      case 'End':
        evt.preventDefault();
        focusLastItem();
        break;
      case 'Space':
        evt.preventDefault();
        toggleSelectItem(nextItem);
        break;
      case 'Backspace':
      case 'Delete':
      case 'Return':
       if (!moveButton) {
         return;
       }

       break;
      default:
       const itemToFocus = findItemToFocus(key);
       if (itemToFocus) {
         focusItem(itemToFocus);
       }
       break;
    }
  }

  function checkClickItem() {}

  return (
    <ul
      ref={ulEl}
      className={cn('Listbox', className)}
      role="listbox"
      onFocus={setupFocus}
      onKeyDown={checkKeyPress}
    >
      { options.map((o, i) => (
        <li
          key={i}
          className={cn('Listbox-item', { selected: value === o }) }
          role="option"
          onClick={() => onSelect(o)}
        >{ o.toString() }</li>
      )) }
    </ul>
  );
});
