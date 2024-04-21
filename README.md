##  Authentication

Authentication is the process of determining whether someone or something is who or what they say they are. 
Authentication technology provides access control for systems by **checking** to see if a **user's credentials** match the credentials in a database of 
authorized users or a data authentication server. In doing this, authentication ensures that systems, processes and enterprise information are secure.

There are several authentication types. For user identity, users are typically identified with a user ID; authentication occurs when the user provides credentials, 
such as a password, that match their user ID.

The practice of requiring a user ID and password is known as single-factor authentication *SFA*.

In recent years, organizations have strengthened authentication by asking for additional authentication factors. 
These can be a unique code provided to a user over a mobile device when a sign-on is attempted or a biometric signature, such as a facial scan or thumbprint. 
This is known as two-factor authentication *2FA* or multifactor authentication *MFA*.


##  Authorization

Authorization **determines the level and type of access to resources that a user has**. It answers the questions who can do what with your data and applications. 
Once a user is authenticated (more on this later) with their user credentials such as username and password, their Authorization will determine the predetermined
menu of operating systems, applications, functionality and the level and ability to make changes to underlying data. Collectively, these permissions are known 
as client privileges.


##  JSON Web Token

JSON Web Token (JWT) is a proposed Internet standard for creating data with optional signature and/or optional encryption whose payload holds JSON that 
asserts some number of claims. The tokens are signed either using a private secret or a public/private key.

Structure

 - Header
Identifies which algorithm is used to generate the signature. 
Typical cryptographic algorithms used are HMAC with SHA-256 (HS256) and RSA signature with SHA-256 (RS256). JWA (JSON Web Algorithms) 

 - Payload
Contains a set of claims. The JWT specification defines seven Registered Claim Names, which are the standard fields commonly included in tokens.

 - Signature
Securely validates the token. The signature is calculated by encoding the header and payload using Base64url Encoding RFC 4648 and 
concatenating the two together with a period separator. That string is then run through the cryptographic algorithm specified in the header. 

Example:
	``` 
	eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

    Header: 
	{
  		"alg": "HS256",
  		"typ": "JWT"
	}

	Payload:
	{
  		"id": "1234567890",
  		"name": "John Doe",
  		"roles": ['admin', 'user']
	}

	Signature:
	HMACSHA256(
  		base64UrlEncode(header) + "." +
  		base64UrlEncode(payload),
		your-256-bit-secret
	) 

	```


##  *express* package

Fast, unopinionated, minimalist web framework for Node.js.
It provides mechanisms to:

 - Write handlers for requests with different HTTP verbs at different URL paths (routes).

 - Integrate with "view" rendering engines in order to generate responses by inserting data into templates.

 - Set common web application settings like the port to use for connecting, and the location of templates that are used for rendering the response.

 - Add additional request processing "middleware" at any point within the request handling pipeline.

https://expressjs.com/en/4x/api.html


##  *CORS* package

CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

Cross-origin resource sharing (CORS) is a mechanism that allows a web page to access restricted resources from a server on a domain different 
than the domain that served the web page.


##  *cookie-parser* package

Parse Cookie header and populate req.cookies with an object keyed by the cookie names. Optionally you may enable signed cookie support by passing a secret string, 
which assigns req.secret so it may be used by other middleware.


##  *nodemon* package

Nodemon is a utility depended on about 3 million projects, that will monitor for any changes in your source and automatically restart your server. 
Perfect for development. Swap nodemon instead of node to run your code, and now your process will automatically restart when your code changes. 


##  *dotenv* package

dotenv package will spawn the process with the environment variables based on a .env file.
