import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App, { calcularNovoSaldo } from './App';

describe('Componente principal', () => {
    describe('Quando eu abro o app do banco', () => {
        it('O nome é exibido', () => {
            render(<App />);
    
            expect(screen.getByText('ByteBank')).toBeInTheDocument();
        })
    
        it('O saldo é exibido', () => {
            render(<App />);
    
            expect(screen.getByText('Saldo:')).toBeInTheDocument();
        })
    
        it('O botão de realizar transação é exibido', () => {
            render(<App />);
    
            expect(screen.getByText('Realizar operação')).toBeInTheDocument();
        })
    })

    describe('Quando eu realizo uma transação', () => {
        it('que é um saque, o valor vai diminuir', () => {
            const valores = {
                transacao: 'saque',
                valor: 200,
            }
            const saldo = 150;

            const novoSaldo = calcularNovoSaldo(valores, saldo);
            expect(novoSaldo).toBe(-50);
        })

        it('que é um depósito, o valor vai aumentar', () => {
            const valores = {
                transacao: 'deposito',
                valor: 200,
            }
            const saldo = -50;

            const novoSaldo = calcularNovoSaldo(valores, saldo);
            expect(novoSaldo).toBe(150);
        })

        it('que é um saque, a transação deve ser realizada', () => {
            /*const {
                getByText, 
                getByTestId, 
                getByLabelText
            } = render(<App/>);*/

            render(<App />)

            const saldo = screen.getByText('R$ 1000');
            const transacao = screen.getByLabelText('Saque');
            const valor = screen.getByTestId('valor');
            const botaoTransacao = screen.getByText('Realizar operação');
            
            expect(saldo.textContent).toBe('R$ 1000');

            fireEvent.click(transacao, { target: { value: 'saque' }});
            fireEvent.change(valor, { target: { value: 10 }});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 990');
        })

        it('que é um depósito, a transação deve ser realizada', () => {
           /* const {
                getByText, 
                getByTestId, 
                getByLabelText
            } = render(<App/>);*/

            render(<App />)

            const saldo = screen.getByText('R$ 1000');
            const transacao = screen.getByLabelText('Saque');
            const valor = screen.getByTestId('valor');
            const botaoTransacao = screen.getByText('Realizar operação');
            
            fireEvent.click(transacao, { target: { value: 'deposito' }});
            fireEvent.change(valor, { target: { value: 1000 }});
            fireEvent.click(botaoTransacao);

            expect(saldo.textContent).toBe('R$ 2000');
        })
    })
    
})