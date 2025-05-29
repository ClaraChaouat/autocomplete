import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Autocomplete from './Autocomplete'
import '@testing-library/jest-dom'


jest.mock('./hooks/useSuggestionFetcher', () => ({
    useSuggestionFetcher: jest.fn()
}))
import { useSuggestionFetcher } from './hooks/useSuggestionFetcher'
const mockFetcher = useSuggestionFetcher as jest.MockedFunction<typeof useSuggestionFetcher>

describe('Autocomplete', () => {
    const onSelect = jest.fn()

    beforeEach(() => {
        jest.clearAllMocks()
    })

    it('affiche le placeholder et l’input', () => {
        mockFetcher.mockReturnValue({
            suggestions: [],
            isLoading: false,
            error: null,
            isOpen: false,
            setIsOpen: jest.fn()
        })

        render(<Autocomplete placeholder="Rechercher un pays..." onSelect={onSelect} />)
        expect(screen.getByPlaceholderText('Rechercher un pays...')).toBeInTheDocument()
    })

    it('affiche le loader quand isLoading=true', () => {
        mockFetcher.mockReturnValue({
            suggestions: [],
            isLoading: true,
            error: null,
            isOpen: false,
            setIsOpen: jest.fn()
        })

        render(<Autocomplete placeholder="Search" onSelect={onSelect} />)
        expect(screen.getByText('Loading...')).toBeInTheDocument()
    })

    it('affiche la liste des suggestions quand isOpen=true', () => {
        mockFetcher.mockReturnValue({
            suggestions: [
                { id: 1, name: 'France' },
                { id: 2, name: 'Spain' }
            ],
            isLoading: false,
            error: null,
            isOpen: true,
            setIsOpen: jest.fn()
        })

        render(<Autocomplete placeholder="Search" onSelect={onSelect} />)
        expect(screen.getByRole('listbox')).toBeInTheDocument()
        expect(screen.getByText('France')).toBeInTheDocument()
        expect(screen.getByText('Spain')).toBeInTheDocument()
    })

    it('affiche le message "No results found" si aucune suggestion', () => {
        mockFetcher.mockReturnValue({
            suggestions: [],
            isLoading: false,
            error: null,
            isOpen: true,
            setIsOpen: jest.fn()
        })

        render(<Autocomplete placeholder="Search" onSelect={onSelect} />)
        expect(screen.getByText('No results found')).toBeInTheDocument()
    })

    it('affiche le message d’erreur si erreur', () => {
        mockFetcher.mockReturnValue({
            suggestions: [],
            isLoading: false,
            error: 'API KO',
            isOpen: false,
            setIsOpen: jest.fn()
        })

        render(<Autocomplete placeholder="Search" onSelect={onSelect} />)
        expect(screen.getByRole('alert')).toHaveTextContent('API KO')
    })

    it('appelle onSelect au clic sur une suggestion', () => {
        mockFetcher.mockReturnValue({
            suggestions: [
                { id: 1, name: 'France' }
            ],
            isLoading: false,
            error: null,
            isOpen: true,
            setIsOpen: jest.fn()
        })

        render(<Autocomplete placeholder="Search" onSelect={onSelect} />)
        fireEvent.click(screen.getByText('France'))
        expect(onSelect).toHaveBeenCalledWith({ id: 1, name: 'France' })
    })

    it('affiche un message d’erreur en cas de caractère invalide', () => {
        mockFetcher.mockReturnValue({
            suggestions: [],
            isLoading: false,
            error: null,
            isOpen: false,
            setIsOpen: jest.fn()
        })

        render(<Autocomplete placeholder="Search" onSelect={onSelect} />)
        const input = screen.getByPlaceholderText('Search')
        fireEvent.change(input, { target: { value: '123#' } })
        expect(screen.getByRole('alert')).toHaveTextContent(
            'Invalid input – only letters, spaces, apostrophes, and hyphens are allowed.'
        )
    })
})
