Feature: Transferencia de saldo

    Background:
        Given que o usuário faça o cadastro
        And o usuário será logado ao sistema

    Scenario: Valor minímo, médio e máximo da transferência com saldo suficiente
        And o usuário com saldo preencher os campos válidos <num_conta,digito,descr>
        When o usuário informar o valor_transf <valor> 0,01; 100 mil reais; um milhão de reais
        Then o usuário deverá conseguir transferir com sucesso

