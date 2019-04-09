import React, { useRef, KeyboardEvent, useEffect } from 'react';
import './Listbox.scss';
import cn from 'classnames';
import { isStringArray } from './util';

export interface Option {
  label: string;
  value: any;
}

interface Props {
  name: string;
  options: any[];
  className?: string;
  value: any;
  onSelect: (value: any) => void;
}

export default React.memo(
  ({ name, options, className, value, onSelect }: Props) => {
    const ulEl = useRef<HTMLUListElement>(null);
    const selectedOptionIndex = options.findIndex(option => option === value);
    const activeDescendant =
      selectedOptionIndex > -1
        ? name + '_opt' + selectedOptionIndex
        : undefined;

    useEffect(() => {
      const ul = ulEl.current;
      if (ul) {
        if (ul.scrollHeight > ul.clientHeight) {
          const element = ul.querySelector(
            '#' + activeDescendant
          ) as HTMLElement;
          var scrollBottom = ul.clientHeight + ul.scrollTop;
          var elementBottom = element.offsetTop + element.offsetHeight;
          if (elementBottom > scrollBottom) {
            ul.scrollTop = elementBottom - ul.clientHeight;
          } else if (element.offsetTop < ul.scrollTop) {
            ul.scrollTop = element.offsetTop;
          }
        }
      }
    }, [activeDescendant]);

    function focusFirstItem() {
      onSelect(options[0]);
    }

    function focusLastItem() {
      onSelect(options[options.length - 1]);
    }

    function setupFocus() {
      if (!activeDescendant) {
        focusFirstItem();
      }
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

      switch (key) {
        case 'ArrowUp':
          evt.preventDefault();
          if (selectedOptionIndex > 0) {
            onSelect(options[selectedOptionIndex - 1]);
          }
          break;
        case 'ArrowDown':
          evt.preventDefault();
          if (selectedOptionIndex < options.length - 1) {
            onSelect(options[selectedOptionIndex + 1]);
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
      }
    }

    return (
      <ul
        ref={ulEl}
        className={cn('Listbox', className)}
        role="listbox"
        onFocus={setupFocus}
        onKeyDown={checkKeyPress}
        tabIndex={0}
        aria-activedescendant={activeDescendant}
      >
        {options.map((o, i) => (
          <li
            key={i}
            id={name + '_opt' + i}
            className={cn('Listbox-item', { selected: value === o })}
            role="option"
            onClick={() => onSelect(o)}
          >
            {o.toString()}
          </li>
        ))}
      </ul>
    );
  }
);
