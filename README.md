# TerbiumOS web
This web os is packed full of feature ***AND MUCH MORE TO COME***
![image](https://user-images.githubusercontent.com/49733954/191388633-1b1f27b0-3ceb-4043-a741-6c3d72440da8.png)
![image](https://user-images.githubusercontent.com/49733954/191388585-055bff3e-3b09-4d46-9c92-e457a51da8d7.png)
![image](https://user-images.githubusercontent.com/49733954/191388608-6cb6f5e0-a6b5-47c8-a50f-a6b3791a1778.png)
## How to deploy:

#### 1. Get a domain. Freenom is an option
  
  ###### a. Go to Freenom.com
![image](https://user-images.githubusercontent.com/107008636/208792596-88692e65-f009-410b-adc9-48aea78c4c27.png)
  ###### b. Search for a domain. See below. (include .gq,.ga,.ml, etc.)
![image](https://user-images.githubusercontent.com/107008636/208793067-61ff29fa-2ea5-428e-b1d0-fd88086afba6.png)
  ###### c. Click "Checkout". See above.
  ###### d. Select "12 months @ FREE" on the right. Then click "Continue". (You will have to create an account at this point)
![image](https://user-images.githubusercontent.com/107008636/208793754-d384fc31-93f3-48ce-a94f-0116d7dee151.png)
  ###### e. Then, complete the order.

#### 2. Change nameservers to cloudflare's
  
  ###### a. On freenom.com go to "Services" and then navigate to "My Domains"
![image](https://user-images.githubusercontent.com/107008636/208794387-f0c3b227-b90b-468e-98d9-30e735e3b66b.png)

  ###### b. Click on Manage Domain. Then click on "Management Tools" and navigate to "Nameservers". We will come back to this
  
  ###### c. In a new tab go to cloudflare.com. Proceed to make an account
  
  ###### d. In the dashboard click "Add Site"
  
  ###### e. Type in the domain you acquired.
  
  ###### f. Select the free plan
  
  ###### g. Wait for the DNS records to be scanned
  
  ###### h. Click "Add Record"
![image](https://user-images.githubusercontent.com/107008636/208797506-11ce43d9-e077-49f5-b4d7-ee8c51854ab1.png)

  ###### i. Set "Type" to CNAME, type @ for the name, "c.terbium.ga" as the target and then click save.
  
  ###### j. Then click "Continue"
  
  ###### k. Copy your Nameservers
![image](https://user-images.githubusercontent.com/107008636/208826599-e1ab0a7d-bd2f-413e-ac1a-c7c1bafb6371.png)

  ###### l. Go back to your freenom tab and select "Use custom nameservers"
  
  ###### m. Paste your nameservers, Then click "Change Nameservers" EXAMPLE:
![image](https://user-images.githubusercontent.com/107008636/208798282-d8ebede1-8955-49b0-b6bf-93e9c155c861.png)

  ###### n. On Cloudflare click "Done, Check Nameservers" (This part can take a while)
  
  
#### 4. Change SSL/TLS settings

  ###### a. On the left in Cloudflare navigate to SSL/TLS
  
  ###### b. In Overview, set SSL/TLS encryption mode to Full
  ![image](https://user-images.githubusercontent.com/107008636/208798904-d8811034-56ec-4bc0-9ef2-b2bc6cb02f95.png)
  
  ###### c. In Edge Certificates, switch "Always Use HTTPS" on
  
  
#### 5. Final Steps

  ###### a. Wait for the email from Cloudflare that says your site is protected.
  
  ###### b. Make sure SSL/TLS is still the same (step 4)
