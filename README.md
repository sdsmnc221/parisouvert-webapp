# Bienvenue sur Paris Ou'Vert !

> *Une application permettant de découvrir un Paris plus vert (et plus ouvert) !*

![enter image description here](https://paris-ouvert.herokuapp.com/assets/imgs/fond_eiffel.png)

**Paris Ou'Vert** est une application mobile sous Android qui permet de lister tous les parcs parisiens, d'obtenir des informations à leur sujet et de les filtrer/trier selon différents critères. En résumé, ***Paris Ou'Vert est l'application qu'il vous faut pour vos sorties en plein air sur Paris !***


# Démarrons l'application !

Vous trouverez ici un guide pour installer et/ou accéder à l'application, accompagné d'explications à son sujet.

 1. Paris Ou'Vert sur votre téléphone.
 2. Paris Ou'Vert depuis votre navigateur.
 3. Paris Ou'Vert en plein code source.

## Paris Ou'Vert sur votre téléphone


Vous pouvez d'ores et déjà **télécharger directement le fichier exécutable de l'application** *(paris-ouvert.apk)* *[sur notre site](http://parisouvert.com)*, ou [*via ce lien*](http://parisouvert.com/app/paris-ouvert.apk) . Le fichier APK est aussi inclu dans la clé USB *(parisouvert/app/apk)*.

Si vous téléchargez l'application depuis votre ordinateur, transférez la ensuite sur votre téléphone. Une fois ceci fait, il vous suffit simplement de **la lancer pour démarrer l'installation,** ce qui prend moins d'une minute. 

*Et voilà ! Vous êtes maintenant **ouvert** à Paris Ou'Vert !*


## Paris Ou'Vert depuis votre navigateur


### Et si Paris Ou'Vert *était* aussi une application web ?

Paris Ou'Vert est développé avec Ionic, qui est basé sur Angular. C'est pour cela qu'avant d'être une application mobile, c'est est une application web.

**Elle est accessible *[via ce lien](https://paris-ouvert.herokuapp.com/)* !**

> Cependant, si vous accédez au site **depuis votre ordinateur**, il est nécessaire de faire clic droit pour **ouvrir l'inspecteur de code**, et de se mettre **en mode responsive**.

Paris Ou'Vert est presqu'une application web, mais nous l'avons développée en nous concentrant complètement sur le mobile-first. C'est pour cette raison que le visuel n'est pas adapté au web. De plus, il y a quelques fonctionnalités natives, exclusives du téléphone qui ne sont pas accessibles sur le navigateur.

### Refaisons notre application web ensemble, en 5 minutes.

*Il nous a fallu juste 5 minutes pour transformer une application mobile hybride sous Ionic en application web.*

1-- **Récupérez le *build*** (le code compilé) **pour le navigateur :** 
- Ce sont tous les fichiers dans le dossier *parisouvert/app/web-build*. Le code du build est dans le dossier *www*, mais les autres fichiers sont aussi importants pour assurer le déploiement de l'application.
- Vous pouvez obtenir le build *www* en faisant $ (sudo) ionic serve dans le dossier *parisouvert/app/mobile-build*. 
- Le fichier *package.json* stocke toutes les dépendances *node_modules* nécessaires à installer.
- Le fichier *server.js* crée un serveur local sous NodeJS et ExpressJS. Bien évidemment vous pouvez le tester directement en local :
		
		//dans le dossier web-build
        $ (sudo) node i --unsafe-perm
        $ node server.js 
        
		L'application est donc accessible via *localhost:5000//*


2-- **Créez un projet sur GitHub et déposer le dossier *web-build*.** Il n'est pas nécessaire de déposer le dossier *node_modules*.

3-- **Connectez-vous sur *[Heroku](https://www.heroku.com)***, une plateforme du cloud dédiée au déploiement et à la publication rapides, sécurisées des applications, adaptée à plusieurs langages et technologies, dont NodeJS. **Créez un nouveau projet** et **reliez-le avec votre projet sur GitHub**.

		Notre compte Heroku :
		login: parisouvert2017@gmail.com
		mdp: Paris-ouvert2017
		projet: paris-ouvert
		
Normalement, le projet fonctionnera correctement car :

- Heroku, avec NodeJS, lance **$ (sudo) npm i** pour nous.
- Nous avons inclus dans le fichier *package.json*  les dépendances typescript et ionic, que le système d'Heroku n'installe pas lui-même.
- Le fichier *Procfile* qui fixe les commandes à exécuter quand l'application sur Heroku est lancée. Ici :
        
		web: npm run build && npm start

*Et voilà !*

## Paris Ou'Vert en plein code source

Nous arrivons au coeur de l'application : le code source.

### Récupérons le code source

1--  Le code source est déjà inclus dans **le dossier *parisouvert/app/mobile-build***.
 
2-- Vous pouvez également le récupérer sur ***[notre projet privé sur GitHub](https://github.com/MarcAdnin/ParisOuvert), la branche master, le tout dernier commit***. Nous vous avons envoyé une invitation à collaborer pour accéder au code.

Dans ce cas :

- Merci de faire un fork du projet et de ne pas le modifier directement.
- Vous devrez installer les dépendances vous-même :

		 $ (sudo) node i --unsafe-perm

### Lancer l'application en mode débogage

Il y a plusieurs manières de démarrer l'application avec le code source, qui nous donne l'accès au débogage direct sur le navigateur.

 - **Déboguer simplement avec votre navigateur et votre inspecteur de code** :

		 $ (sudo) ionic serve
		
- **Déboguer avec votre smartphone branché et votre navigateur, de préférence Google Chrome.** Attention, il vous faudra avoir installé Android Studio, Java SDK8+, et Gradle.

		// Installer l'application sur votre téléphone (Android)
			   $ (sudo) ionic cordova run android (--livereload)
		
		// L'application s'installe et se démarre toute seule.
		// Il faut que l'application soit lancée.
		
		// Ouvrir le débogueur de Chrome, en tapant dans la barre d'adresse 
				chrome://inspect
		

*Et voilà !*

# Lancons la base de données !

Vous trouverez dans cette partie notre base de données, accessible en ligne et manipulable en local.

 1. La base de données en local.
 2. La base de données hébergée sur OVH, ou autres.
 3. Les APIs.

## La base de données en local.

### Récupérons le fichier de la base de données

**...qui est le fichier *parisouvert/db/data/parisouvert-db.sql*.** En effet, notre base de données est en MySQL. Vous trouverez dans le même dossier les images vous permettant de facilement visualiser la structure de la base de données.

### Démarrons notre base de données

Il vous suffira de **lancer votre serveur local** (WAMP/MAMP avec phpMyAdmin bien disponible). Grâce à l'interface de **phpMyAdMin**, vous pourrez facilement **importer le fichier .sql**.

*Et voilà ! Vous êtes maintenant **ouvert** à la base des données !*


## La base de données hébergée sur OVH, ou autre.

Avec le même fichier *parisouvert-db.sql,* il est facile d'exporter notre base des données vers n'importe quel hébergeur, à condition que le serveur tourne en PHP / MySQL et permette l'importation du fichier .sql (avec phpMyAdmin ou CLI).

Il vous suffira d'accéder à la gestion de la base de données (qui est phpMyAdmin sur la plupart des hébergeurs) et **d'importer le fichier**.

Par exemple, notre base des données tourne parfaitement sur notre serveur d'OVH :

		Le lien vers OVH (https://www.ovh.com/auth/):
		login : parisouvert2017@gmail.com
		mdp : parisouvert2017
		
		Pour accéder à la base de données :
		login : parisouvertcbackpa
		mdp : Parisouvert2017back 
		
		Pour accéder à la gestion de fichiers :
		login : parisouvrc
		mdp : Parisouvert2017
		

	
*Et voilà !*


## Les APIs

Les APIs de l'application se concentrent surtout sur les opérations de lecture (récupération, tri, filtrage des données de la base de données hébergée sur un serveur, et l'affichage de ces dernières sur le client, ou l'application). Il y a également des opérations d'ajout de données.

### Le coeur de l'échange des données : les APIs en PHP.

Notre API est créée avec ***[PHP-CRUD-API](https://github.com/mevdschee/php-crud-api)*** , qui est :

> Single file PHP script that adds a REST API to a MySQL 5.5 InnoDB database. PostgreSQL 9.1 and MS SQL Server 2012 are fully supported. There is even limited support for SQLite 3.
>
> *Un simple script PHP open source qui rajoute une API REST puissante aux bases des données en MySQL 5.5+ (InnoDB), et autre.*

Elle est accessible via *parisouvert/db/api/api.php*. 

Après, il vous suffit de :

1-- **Modifier les dernières lignes du script :**

```
	$api = new PHP_CRUD_API(array(
		'username'=>'xxx',
		'password'=>'xxx',
		'database'=>'xxx',
	));
	$api->executeCommand();
```
Par exemple, dans notre cas où la base des données est hébergée sur OVH :
```
	$api  =  new  PHP\_CRUD\_API(array(
		'dbengine'=>'MySQL',
		'hostname'=>'parisouvrcbackpa.mysql.db',
		'username'=>'parisouvrcbackpa',
		'password'=>'Parisouvert2017back',
		'database'=>'parisouvrcbackpa',
		'charset'=>'utf8'
	));
	
	$api->executeCommand();
```

2-- **Héberger le fichier api.php sur votre serveur** (local ou à distance). 

Vous pourrez donc accéder à l'API. Par exemple :
```
	Notre API hébergée sur OVH :
	http://parisouvert.com/api.php/

	Pour récupérer la table espace_vert :
	http://parisouvert.com/api.php/espace_vert/
```

Pour les manipulations plus avancées, [***veuillez consulter la documentation de PHP-CRUD-API***](https://github.com/mevdschee/php-crud-api), ou notre API en contrepartie en Javascript, expliquée ci-dessous.

> Attention ! PHP-CRUD-API supporte la récupération des données de multiples conditions (SELECT ... WHERE ... AND ... OR), mais **ne permet pas la récupération des données de plusieurs tables différentes** *(par exemple :
```
SELECT a.toto, b.titi FROM a LEFT JOIN b WHERE a.some_id = b.some_another_id 
```
>  n'est pas possible)*.

### Une autre API PHP faite maison.

Notamment à cause de cette limite de l'API de base, nous avons créé nous-même une autre API, qui démontre notre capacité à récupérer des données avec PHP / MySQL indépendantes d'autres outils et scripts.

L'API est accessible via parisouvert/db/api/api-aDj.php. aDj pour Aires de jeux : nous utilisons cette API pour récupérer les IDs des espaces verts proposant des aires de jeux.

La configuration et l'installation reste les mêmes :

1-- **Modifier le script :**

```
$bdd  =  new  PDO('mysql:host=parisouvrcbackpa.mysql.db;dbname=parisouvrcbackpa;charset=utf8', 'parisouvrcbackpa', 'Parisouvert2017back');
```

2-- **L'Héberger sur votre serveur et y accéder :**

```
	Notre API hébergée a pour nom api-test.php :
	http://parisouvert.com/api-test.php
```

Pourtant, on peut aussi récupérer cette même liste d'IDs avec notre API de base, avec quelques modifications :
```
	Ajout d'une table popular_evs qui contient l'ID des espaces verts concernés.
	
	Et voilà :
	http://parisouvert.com/api.php/popular_evs?transform=1&columns=ev_id_FK
```

### Récupération et manipulation des données avec les services en Typescript.

Pour la récupération des données depuis le client (l'application) et leur traitement (le formatage, les opérations de tri et de filtrage), nous avons créé des providers Ionic (ou des services d'Angular) en nous appuyant sur :

- la programmation typée de Typrscript ;
- la manipulation d'objets, de tableaux et le multi-threading / les requêtes asynchrones de Javascript ES6+ ;
- le RxJS (Reactive Javascript), permettant la manipulation des streams de données Observable.
- le HttpModule d'Angular, permettant l'envoi des requêtes HTTP vers ailleurs (et la manipulation de notre API PHP en passant les paramètres)

Dans le dossier *parisouvert/db/api*, vous trouverez donc les fichiers :

- *espace-vert.ts* : le service EspaceVertProvider, permettant la récupération de 90% des données depuis la base des données pour l'application ;
- *search.ts* : le service SearchProvider, permettant la recherche simple et avancée (recherche par mots clés, tri, filtrage) ;
- *helpers.ts* : le service HelpersProvider où sont stockés les helpers functions.

Nous mettons ces fichiers ici afin que vous puissiez visualiser plus clairement et concrètement le code. Cependant, séparés de leur environnement et des dépendances nécessaires, ces fichiers ne marchent pas comme ils le devraient.

Pour comprendre comment le code marche, ainsi que l'usage des services, veuillez consulter le code source *(parisouvert/app/mobile-build/src)*.

# Et elles viennent d'où, les données de l'application ?

Les données de l'application proviennent de plusieurs sources :

- les utilisateurs (par exemple, leur position, et dans l'avenir, les horaires de leur smartphone) ;
- les APIs externes (Google Maps / Places API qui nous donnent l'accès aux données plus complètes des espaces verts (leur position, leur coordonnées, leurs horaires, etc.) ;
- et notre base des données, qui est le résultat d'une récupération rigoureuse des données open source.

Vous trouverez donc dans le dossier parisouvert/data toute notre démarche de récupération des données pour créer notre propre base de données, durant les deux premiers sprints. 

 1. Récupération des données sous un serveur PHP, avec les objets asynchrones de Javascript ES6.
 2. Récupération des données avec une mini application de web scraping sous NodeJS / ExpressJS.

## Récupération des données sous un serveur PHP, avec les objets asynchrones de Javascript ES6.

### Les données
Le résultat de cette tentative de récupération des données se trouve dans le dossier parisouvert/data/spr1/data, dont :

- le fichier data.json : les données recupérées ;
- le fichier outputData.json : la version minifiée, condensée du fichier data.json (illisible par les humains) ;
- le fichier img-urls.json : les liens vers les images libres de droit des espaces verts.
 
### Le web scraper

Vous trouverez dans le dossier parisouvert/data/spr1/scraper le coeur de notre web scraper simplifié, qui tourne sous un serveur PHP.

1-- Hébergez ce dossier sur un serveur (par défaut, serveur local WAMP/MAMP).
 
 2-- Accédez au fichier index.html sur votre navigateur:
```
	localhost://parisouvert/data/spr1/scraper/index.html
```
3-- Ouvrez la console de votre navigateur et attendez un instant. Vous trouverez les données récupérées stockées dans le même dossier, et affichées dans la console.

Il n'y a rien dans le fichier index.html, parce que le coeur de ce mini web scraper se trouve dans le fichier data.js. Les autres scripts PHP agissent comme un pont reliant le serveur local à internet, et sont un moyen de sauvegarder les données en local sous format JSON.

### La base de données

Dans le dossier parisouvert/data/spr1/db se trouvent les scripts permettant l'importation des données dans la base des données MySQL, et éventuellement leur récupération. Ces scripts sont principalement utilisés pour la base de données et pour le prototype de l'application du premier sprint. 

> Il y a de fortes chances que le code ne marche pas bien, car il n'a plus été consulté ou utilisé après la fin du premier sprint.

1-- Hébergez ce dossier sur un serveur (par défaut, serveur local WAMP/MAMP).
 
 2-- Accédez au fichier index.html sur votre navigateur:

- updateDB.php : le traitement et l'importation des données dans la base de données ;
- retrieveData.php : la récupération des données sous format JSON (cette API a été faite au début du troisième semestre, il n'y a donc pas d'implémentation propre et méthodique comme un script d'API devrait avoir).

## Récupération des données avec une mini application de web scraping sous NodeJS / ExpressJS.

### Les données
Le résultat de cette tentative de récupération des données se trouve dans le dossier parisouvert/data/spr2/data, dont les fichiers principaux sont :

- full-data-spr2.json : les données recupérées, entièrement rassemblées ;
-  data1.json, data2.json: respectivement, les données récupérées lors du premier et du deuxième sprint, qui ont ensuite été fusionnés pour obtenir full-data-spr2.json. 

### Le web scraper

Vous trouverez dans le dossier parisouvert/data/spr2/scraper le coeur de notre web scraper simplifié qui tourne sous NodeJS/ExpressJS.

1-- Positionnez-vous dans ce dossier. Normalement il y a déjà toutes les dépendances dans le dossier node_modules, ce qui vous évite de les télécharger de nouveau avec $ (sudo) install (--unsafe-perm).
 
 2-- Lancez l'application
```
	node index.js
```
3-- Lancez en ordre sur votre navigateur & observer la console de votre terminal :

> Nous sommes vraiment désolés pour le lancement manuel de l'application. Nous avions un script d'automatisation de toutes les étapes de l'application, cependant, ce script laisse des places aux risques et aux erreurs imprévus (parce qu'il enchaine plusieurs centaines, voire milliers de requêtes vers le web dans un temps très court). Par conséquent, il est préférable de lancer l'application manuellement pour une meilleure gestion d'erreurs. 

```
	localhost:8081/urls-raw2
	localhost:8081/urls-raw1
	
	/**
	Attention, il s'agit ici d'une procédure vraiment fastidieuse où l'application va traiter les données et éliminer toute répétition. 
	Vous avez donc déjà le résultat de cette étape, qui est le fichier url-ok.json. 
	Vous pouvez donc passer à l'étape suivante.
	**/
	localhost:8081/urls-treated-1 
	localhost:8081/urls-treated-2

	/**
	Vous avez également à votre disposition les fichiers nécessaires pour passer à l'étape suivante.
	**/
	localhost:8081/services-1 
	localhost:8081/addresss1 

	//On peut passer directement à cette étape :
	localhost:8081/services-2 
	localhost:8081/addresss2 //faut la lancer !
	localhost:8081/types

	/**
	La récupération des photos se fait avec un navigateur de type headless, ici Nightmare.js. Vous pouvez essayer de le lancer si vous voulez. 
	Si rien ne s'affiche quand vous lancez ces étapes :
		$ (sudo) npm i --save --unsafe-perm nightmare
	Pour mettre à jour les dépendances :
	**/
	localhost:8081/images
	localhost:8081/image2
```

### Les scripts PHP & La base de données

Dans les dossier parisouvert/data/spr2/imgs et parisouvert/data/spr2/db/import se trouvent les scripts permettant, respectivement, de télécharger toutes les images et d'importer toutes les données dans la base de données. 

1-- Hébergez ces dossiers sur un serveur (par défaut, serveur local WAMP/MAMP).
 
 2-- Accédez aux fichiers sur votre navigateur:
```
	//Pour télécharger les images
	localhost://parisouvert/data/spr2/imgs/getIMG.php
	
	//Pour importer les données dans la base des données
	//Configurez le fichier link.php si nécessaire !
	localhost://parisouvert/data/spr2/db/import/import.php
```

### Le formatage des données et l'optimisation des images
Dans le dossier parisouvert/data/spr2/db/formatter se trouvent les scripts permettant, respectivement, de formater toutes les données avant de les importer dans la base de données et d'optimiser les images pour améliorer la performance générale de l'application.

Ces mini applications tournent aussi sous NodeJS/ExpressJS.
