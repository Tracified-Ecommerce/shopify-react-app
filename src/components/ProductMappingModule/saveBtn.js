import { FloatingMenu, MainButton, ChildButton } from 'react-floating-button-menu/build';
import MdAdd from 'react-icons/lib/md/add';
import MdClose from 'react-icons/lib/md/close';

  <FloatingMenu slideSpeed={500} direction="left">
    <MainButton
      iconResting={MdAdd}
      iconActive={MdClose}
      iconColor="white"
      backgroundColor="black"
      buttonSize="56"
    />
    
  </FloatingMenu>
