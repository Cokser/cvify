import { ReactNode } from 'react';

import Header from "../header";
import Footer from '../footer'


interface Props {
  children?: ReactNode
}

const Layout = ({ children, ...props }: Props) => (
  <>
    <Header />
    {children}
    <Footer />
  </>
);

export default Layout;
