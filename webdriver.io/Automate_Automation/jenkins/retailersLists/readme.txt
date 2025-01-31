1. Define the all required scripts in Jenkins via 'Scriptler' plugin.
Scripts would be stored under: /var/lib/jenkins/scriptler/scripts

2.Use 'Extended Choice Parameter' plugin make appropriate configuration:
- Name:RETAILERS
- Description:Retailers list

Basic Parameter Types // mark radio
- Parameter Type:Check Boxes
- Number of Visible Items:100
- Delimiter: [space]

Choose Source for Value
- Groovy Script File:/var/lib/jenkins/scriptler/scripts/desktopProdComma.groovy

Choose Source for Default Value
// should be appropriate script, or nothing
- Default Groovy Script File:/var/lib/jenkins/scriptler/scripts/desktopProdSpace.groovy


