import React from 'react';
import { Button } from 'ui'

const Header = () => (
  <header>
    <h2>main header</h2>
    <label htmlFor='name'>
      <input type='text' name="name" id="name" />
    </label>
    <Button />
  </header>
);

export default Header;
