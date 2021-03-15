# Vyrob si vlastního chatbota

V posledních letech zažívají obrovský boom uživatelská rozhraní založená na přirozené konverzaci. Můžeš se svého telefonu zeptat na zítřejší počasí, rezervovat si na facebooku lístky do kina apod. Přijď si vytvořit vlastního chatbota a zjistit, jak se takováto rozhraní vyrábí.
Úvod

### Co se na tomto workshopu naučíte a co si vyzkoušíte:

* Zjistíte, jak fungují automatické roboty pro chat
* Zjistíte, jak ze svého počítače udělat server pro chatbota
* Naučíte se konfigurovat chatbota na facebooku
* Vytvoříte si vlastního chatbota v jazyce Javascript
* A nakonec si se svým chatbotem můžete promluvit!

### Co k tomu budete potřebovat:

* Účet na Facebooku

### Start
* https://github.com/snopedom/facebook-bot/blob/master/article.md#facebook-dev-panel-time
* https://developers.facebook.com/ -> MyApps
* vlevo v menu je Messenger > Settings -> sekce Access Tokens - tlačítko Generate Token -> vložit do config/default.json
* vlevo v menu je Settings > basic -> App Secret -> Show -> vložit do default.json
* yarn startTunnel
* yarn startDev
* zkopírovat z terminálu startTunnel url a token do developers.facebook - Messenger -> Settings -> sekce Webhooks - Edit callback url
* pak se v terminálu startDev zobrazí Validation Succeded
* jít na stránku ve fb -> zobrazit jako návštěvník -> používat chat
