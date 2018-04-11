import React from 'react';
import Aux from '../../hoc/Aux';
import Style from './Layout.css';


const layout = (props) => (
    <Aux>
        <div>
            Toobar, SideDraw, and Backdrop dude
        </div>

        <main className={Style.content}>
            {props.children}
        </main>
    </Aux>

);


export default layout;