import { render, waitFor, waitForElementToBeRemoved, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import List from './components/List';

/* Basico do Basico */
test('sum', () => {
    expect(1 + 1).toBe(2);
})

/* 
    Exemplos ja utilizando a testing-library 
    Por estar utilizando o get, se não encontrar, ele falha o teste
*/
test('text', () => {
    const { getByText } = render(<List initialItems={[]}/>);

    expect(getByText('Salve mundo')).toBeTruthy();
})

test('anotherWayText', () => {
    const { getByText } = render(<List initialItems={[]}/>);

    expect(getByText('Salve mundo')).toBeInTheDocument();
})

test('haveClass', () => {
    const { getByText } = render(<List initialItems={[]}/>);

    expect(getByText('Salve mundo')).toHaveAttribute('class','world');
})

/* Query não falha o teste caso não encontre o elemento */
/* Find espera o elemento aparecer em tela */

/* Describe para quando tiver muitos testes em um unico componente (exemplo) */
describe('List Component', () => {
    it('should render list items', () => {
        const { getByText } = render(<List initialItems={['Guilherme', 'Gabriel', 'Giovana']}/>)

        expect(getByText('Guilherme')).toBeInTheDocument();
        expect(getByText('Gabriel')).toBeInTheDocument();
        expect(getByText('Giovana')).toBeInTheDocument();
    });

    /* Async para utilizar os eventos de userEvent => v14 >= */
    /* v13 não utilizava */
    it('should be able to add new item to the list', async () => {
        const user = userEvent.setup();
        const { getByText, getByPlaceholderText, debug } = render(<List initialItems={[]}/>)

        const buttonElement = getByText('Adicionar');
        const inputElement = getByPlaceholderText('Novo item');

        /* Podemos utilizar debug() para ver o que está acontecendo com a renderizacao*/
        // debug()
        await user.type(inputElement, 'Novo');
        await user.click(buttonElement);
        // debug()

        expect(getByText('Novo')).toBeInTheDocument()
    })

    it('should be able to add new item to the list after the requisition', async () => {
        const user = userEvent.setup();
        const { findByText, getByText, getByPlaceholderText, debug } = render(<List initialItems={[]}/>)

        const buttonElement = getByText('Adicionar Event');
        const inputElement = getByPlaceholderText('Novo item');

        await user.type(inputElement, 'Novo');
        await user.click(buttonElement);

        expect(await findByText('Novo')).toBeInTheDocument();

        /* Outra forma */
        /* waitFor aceita um intervalo também de looping de verificação */
        await waitFor(async () => {
            expect(getByText('Novo')).toBeInTheDocument();
        });

    })

    it('should be able to remove item from list after the requisition', async () => {
        const user = userEvent.setup();
        const { getByText, getAllByText, queryByText } = render(<List initialItems={['Guilherme']}/>)

        const removeButtons = getAllByText('Remover');

        /* Primeiro da lista */
        await user.click(removeButtons[0]);

        /* Elemento ser removido */
        await waitForElementToBeRemoved(() => {
            return getByText('Guilherme');
        })

        /* 
            Outra forma 
            O '.not' serve para qualquer metodo, sentido de negação 
            Utiliza-se o queryByText, em vez de getByText, uma vez que 
            para o get, o elemento DEVE existir, caso contrário falha no teste.
        */
        await waitFor(() => {
            expect(queryByText('Guilherme')).not.toBeInTheDocument();
        })
    })
})
