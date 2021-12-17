import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MutationObserver from 'mutationobserver-shim';

import Article from './Article';

const article ={
	image: 'https://picsum.photos/id/237/200/300',
	headline: 'YOLOYO',
	author: 'Freedom of Speech',
	summary: 'lipsum',
	body: 'lispsum?',
	createdOn: ''
}
const article2 ={
	image: 'https://picsum.photos/id/237/200/300',
	headline: 'Testing sucks',
	author: '',
	summary: 'lipsum',
	body: 'lispsum?',
	createdOn: ''
}

test('renders component without errors', ()=> {
	render(<Article article={{
	image: '',
	headline: '',
	author: '',
	summary: '',
	body: '',
	createdOn: ''
}} />)
});

test('renders headline, author from the article when passed in through props', ()=> {
	render(<Article article={article}/>);
	
	const headline = screen.queryByText(/YOLOYO/i);
	const author = screen.queryByText(/Freedom of Speech/i)

	expect(headline).toBeInTheDocument();
	expect(author).toBeInTheDocument();
});

test('renders "Associated Press" when no author is given', ()=> {
	render(<Article article={article2}/>);
	const author = screen.queryByText(/Associated Press/i)
	expect(author).toBeInTheDocument();
});

test('executes handleDelete when the delete button is pressed', async ()=> {
	const mockHandleDelete = jest.fn();

	render(<Article article={article} handleDelete={mockHandleDelete}/>);

	const deleteButton = await screen.findByTestId('deleteButton');
	userEvent.click(deleteButton);

	await waitFor(() => expect(mockHandleDelete).toBeCalled())
});

//Task List:
//1. Complete all above tests. Create test article data when needed.