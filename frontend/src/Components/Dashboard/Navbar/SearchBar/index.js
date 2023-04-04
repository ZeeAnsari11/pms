import React, {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {SearchInput, SearchIcon, SearchContainer, CloseIcon} from './styles'

const SearchBar = () => {
    const [expanded, setExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef(null);
    const navigate = useNavigate();

    const toggleExpand = () => {
        setExpanded(!expanded);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape') {
            setExpanded(false);
        } else if (event.key === 'Enter' && searchValue) {
            navigate(`/search?q=${searchValue}`);
            setExpanded(false);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchValue(event.target.value);
    };

    const handleSearchInputBlur = () => {
        setExpanded(false);
    };

    const handleClearSearch = () => {
        setSearchValue('');
    };

    const stopPropagation = (event) => {
        event.stopPropagation();
    };

    useEffect(() => {
        if (expanded) {
            inputRef.current.focus();
        }
    }, [expanded]);

    return (
        <SearchContainer onClick={toggleExpand} onKeyDown={handleKeyDown} expanded={expanded}>
            <SearchIcon/>
            {expanded ? (
                <>
                    <SearchInput
                        ref={inputRef}
                        placeholder="Search..."
                        value={searchValue}
                        onChange={handleSearchInputChange}
                        onBlur={handleSearchInputBlur}
                        onClick={stopPropagation}
                    />

                </>
            ) : (
                <SearchInput placeholder="Search..." onClick={toggleExpand}/>
            )}
        </SearchContainer>
    );
};

export default SearchBar;
