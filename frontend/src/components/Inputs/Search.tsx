import { ChangeEvent, FC, KeyboardEvent, useId, useState } from 'react'
import { TailwindClasses } from '../types'
import Button from '../Button'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import styles from './Search.module.css'

export interface SearchProps {
	onSearch: (query: string) => void
	name: string
	placeholder: string
	minLength?: number
	iconPos?: 'left' | 'right'
	searchStyles?: TailwindClasses
	isLoading?: boolean
}

const Search: FC<SearchProps> = ({
	onSearch,
	placeholder,
	searchStyles,
	name,
	iconPos = 'right',
	minLength = 3,
	isLoading = false,
}) => {
	const [query, setQuery] = useState('')
	const uniqueId = useId()

	const handleSearch = () => query.length >= minLength && onSearch(query)
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()

	const searchClasses = `${styles.searchInput} ${searchStyles}`

	return (
		<div className={styles.searchContainer}>
			{iconPos === 'left' && (
				<Button
					icon={<MagnifyingGlassIcon className='h-6 w-6' />}
					onClick={handleSearch}
					type='text'
					size='small'
				/>
			)}

			<input
				name={name}
				className={searchClasses}
				placeholder={placeholder}
				aria-placeholder={placeholder}
				aria-describedby={`${uniqueId}-${name}`}
				type='search'
				onChange={handleChange}
				onKeyDown={handleKeyDown}
			/>

			{iconPos === 'right' && (
				<Button
					isLoading={isLoading}
					buttonStyles=''
					icon={<MagnifyingGlassIcon className='h-6 w-6' />}
					onClick={handleSearch}
					type='text'
					size='small'
				/>
			)}
		</div>
	)
}

export default Search
