import { Dropdown} from 'rsuite';
import './CategoryDropdown.css'


export function CategoryDropdown() {
    return (
        <CustomMadeDropdown className="Category" title="CATEGORIES" trigger="click" style={{innerWidth:300}}/>

    ); 
}


const CustomMadeDropdown = ({ ...props }) => (
        <Dropdown {...props}>
          <Dropdown.Item><button className='buttonCategory'>CATEGORY 1</button></Dropdown.Item>
          <Dropdown.Item><button className='buttonCategory'>CATEGORY 2</button></Dropdown.Item>
          <Dropdown.Item><button className='buttonCategory'>CATEGORY 3</button></Dropdown.Item>
        </Dropdown>
      );



