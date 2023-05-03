Feature: Transferência de saldo

Background:
Given que o usuário está na tela de transferência

Scenario: Transferência bancária
When o usuário informar "<valorTransf>","<descr>"
Then o usuário deverá ver a "<mensagem>"

Examples:
| valorTransf | descr            | mensagem                                          |
| 0           | conta de energia | Valor da transferência não pode ser 0 ou negativo |
| -1          | conta de água    | Valor da transferência não pode ser 0 ou negativo |
| 11          | netflix          | Conta inválida ou inexistente                     |
| 1.000,01    | iptu             | Conta inválida ou inexistente                     |
| 0.01        | spotify          | Nao pode transferir pra mesmo conta               |
| 10          | reserva          | Transferencia realizada com sucesso               |



