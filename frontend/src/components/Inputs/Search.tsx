import { ChangeEvent, FC, KeyboardEvent, useId, useState } from 'react'
import { TailwindClasses } from '../../utils/types'
import Button from '../UI/Button'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import styles from './Search.module.css'
import { disableRadiusLeft, disableRadiusRight } from '../../utils/variables'

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
	searchStyles = '',
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

	const buttonClasses = `bg-white/40 shadow-xs border border-solid border-[--light3] focus:shadow-sm py-2 px-2 hover:bg-white/50 ${
		iconPos === 'right' ? disableRadiusLeft : disableRadiusRight
	}`
	const searchClasses = `${styles.searchInput} ${searchStyles}  ${iconPos === 'right' ? disableRadiusRight : disableRadiusLeft}`

	return (
		<div className={styles.searchContainer}>
			{iconPos === 'left' && (
				<Button icon={<MagnifyingGlassIcon className='h-6 w-6' />} onClick={handleSearch} buttonStyles={buttonClasses} variant='text' />
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
					buttonStyles={buttonClasses}
					icon={<MagnifyingGlassIcon className='h-6 w-6' />}
					onClick={handleSearch}
					variant='text'
				/>
			)}
		</div>
	)
}

export default Search
