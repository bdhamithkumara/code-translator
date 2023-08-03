
import {languages} from '@/constants/languages';
import Select from 'react-select'


const LanguageSelect = ({ language, handleLanguageChange, disabled }) => {
    
    const formatOptionLabel = ({ _, label }) => (
        <div className='flex flex-row justify-between items-center'>
            <p>{label}</p>
            {language===label && <p className='text-xs text-slate-400'>Select</p>}
        </div>
    );
    
    return (
        <Select
            // Adding necessary styling classes
            className="w-full rounded-t-lg border-2 border-black"
            // Setting the initial value to the current language and passing the change handler function
            value={{label: language, value: language}}
            onChange={handleLanguageChange}
            // Disabling the dropdown if the component is currently loading
            isDisabled={disabled}
            // Sorting the list of options alphabetically by label
            options={languages.sort((a, b) => a.label.localeCompare(b.label))}
            // Using the formatOptionLabel function to display the label of each option
            formatOptionLabel={formatOptionLabel}
        >
        </Select>
    );
};

export default LanguageSelect;
