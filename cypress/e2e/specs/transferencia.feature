Feature: Transferência de saldo

Background:
Given que o usuário está na tela de transferência

Scenario: Informações bancárias
When o usuário informar "<valorTransf>","<descr>"
Then o usuário deverá ver a "<mensagem>"

Examples:
| valorTransf | descr            | mensagem                                          |
| 0           | conta de energia | Valor da transferência não pode ser 0 ou negativo |
| 1           | spotify          | Nao pode transferir pra mesmo conta               |
| 0,01        | spotify          | Nao pode transferir pra mesmo conta               |
| 10          | reserva          | Transferencia realizada com sucesso               |




