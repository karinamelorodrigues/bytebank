import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import api from "./api";
import App from './App';
import Conta from './conta/Conta';

jest.mock('./api');

describe('Requisições para API', () => {
    it('Exibir lista de transações através da API', async () => {
      api.listaTransacoes.mockResolvedValue([
        {
            "valor": "10",
            "transacao": "saque",
            "data": "10/08/2020",
            "id": 1
          },
          {
            "transacao": "deposito",
            "valor": "20",
            "data": "26/09/2020",
            "id": 2
          }
      ]);
      
      render(<App />);
      await screen.findByText('saque');
      expect(screen.getByTestId('transacoes').children.length).toBe(2);


    });

    it('Chama a função de realizar transação, quando o botão é clicado', () => {

        const funcaoRealizarTransacao = jest.fn();

        render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />)

        fireEvent.click(screen.getByText('Realizar operação'));

        expect(funcaoRealizarTransacao).toHaveBeenCalled();
    })
})