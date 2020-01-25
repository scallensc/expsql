# T3A3

### Overview:

This application prototype utilises faker js to generate user data and post content, as a demonstration for an API endpoint/backend system, and relational database system for a blog posting platform.

As the user data is randomly generated, there are no privacy concerns relating to this specific data. 

#### Mitigation of malicious input:

Nonetheless, the data generated for insertion into the database is done using parameterisation, these prepared statements would prevent the use of SQL injection attacks. If the data was being garnered from real people, this would help to avoid most attacks. In addition, there would be a user registration and login system utilising features such as a registration validation token, along with generating a unique salt and hashing of passwords before being stored in the database.

In addition, for the actual post content, an ORM such as sequelize would be utilised in order to escape user inputs that might be used in a SQL injection attack. Sanitisation would also involve removing script tags from a post to prevent HTML/Javascript from being rendered in a post, which could be achieved using ExpressJS middleware such as express-validator or joi.

At present, post content is only displayed to the end user as JSON data, as such, these concerns did not need to be addressed in this prototype.

#### Development obligations:

This project could be delivered fairly rapidly in a production state with the aforementioned concerns taken into account, adding a blogging/post/comment platform to a website would not take a particularly large amount of time given the simplistic nature of the relational database implementation. Adding features such as comments, comments on comments, likes on posts, etc, would involve simple additions to the existing schema, and as such, this prototype could be rapidly fleshed out depending on the clients feature preferences. Maintenance of the system would also be fairly simple, with certain SQL functions barred from use from anyone without Admin access, it would be difficult for someone to cause much damage to the database. A strong password would be required for the Admin account, and access levels would be limited to the ability to create a post, etc, for non Admin users. No access to commands like DROP would be allowed for these non admin users, despite the aforementioned ORM/sanitisation that would be occurring with their content to be stored in the database, this should prevent most if not all attacks from users.

As a proof of concept, and as previously mentioned, with randomly generated data, there are no ethical obligations to consider with this prototype in and of itself. For a production version however, the ethical obligations tie very closely with legal and privacy implications.

Strong storage of passwords with randomly generated salts, and subsequent hashing, would help prevent a users password from being decrypted, should the database somehow be compromised. In regards to passwords specifically, in a production system, the reset password feature would be made to generate a new unique salt any time a password is reset, as opposed to the reuse of the previous one, the password would then be hashed again with this new unique salt. These password policy features should conform to GDPR standards, etc.