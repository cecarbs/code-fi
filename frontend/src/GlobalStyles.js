import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    * {
        margin: 0;
        scrollbar-width: thin;
        /* scrollbar-color: #fff; */
    }
    
    body {
        font-family: 'Nunito', sans-serif;
    }

    /* *::-webkit-scrollbar {
        width: 5px;
    } */

    /* *::-webkit-scrollbar-track { */
        /* background: transparent; */
    /* } */

    /* *::-webkit-scrollbar-thumb { */
        /* background-color: #fff; */
        /* border-radius: 20px; */
        /* border: transparent; */
    /* } */
`

export default GlobalStyles;