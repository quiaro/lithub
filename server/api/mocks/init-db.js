const mongo = require('../helpers/mongo')

mongo.connect().then((db) => {

  db.collection('users').drop();
  const insertUsers = db.collection('users').insertMany([
    { _id: '101',
      username: 'kiko',
      name: 'Carlos Villagrán',
      email: 'kiko@elchavo.com',
      password: '0c691059eb183a4a138c994cf5195c92bf3c9bc977504943a5b474fef5eaa4602c95f541203a72af80f4d1bbae385a8a9cbdfae417cd4ab79d98fb5ad472626930777ace9e88670ccd3b28766d6cd5f06317427868a9c5c43463fadec9f200bb859e295257d804b206d3237c40d9a311a6be8ccbabe7268b24ac80c9f8ade6e8',
      salt: 'f3b72ea4c58061dfd6d281a640c4adfb25d128d91f8da712bccbc74ee3fce89116e440e90c273ff2efd9f364c7b058eda8c2e44d6f705fade332261633517468',
      read: ['201', '204', '207'],
    },
    { _id: '102',
      username: 'chespirito',
      name: 'Roberto Goméz Bolaños',
      email: 'chespirito@elchavo.com',
      password: '61e3188cdc37e6a5a474b13619fe02d0dd3dbce83fed4b6b0111c313eb6d80af9a31b5e4363413b3ee4e4a8db51bdc6865d94d77ed9f29486f3644cf70cbc4b33d77ec6637d175108b3523600366cbe8afad228f972668573daa1d9e015f6128190c266260f7dee7e6a8a87c628fd709bdbc704bed338a3b86cc75ec27c44764',
      salt: '96412d1304b4d646a7307e33c768fc14c1265f95296e5f7984fcc0fdacb8864d526a448622e9465b23722dabeea27d10ecea9c3fd1d3f2e30d74f22012334e1c',
      read: ['202', '203', '205', '206']
    }
  ]);

  db.collection('resources').drop();
  const insertResources = db.collection('resources').insertMany([
    { _id: '201',
      type: 'book',
      title: 'Roots',
      authors: ['Alex Haley'],
      readBy: ['101']
    },
    { _id: '202',
      type: 'book',
      title: 'Madame Bovary',
      authors: ['Gustave Flaubert'],
      readBy: ['102']
    },
    { _id: '203',
      type: 'book',
      title: 'David Copperfield',
      author: ['Charles Dickens'],
      readBy: ['102']
    },
    { _id: '204',
      type: 'article',
      title: 'Powerful Ideas Need Love Too!',
      author: ['Alan Kay'],
      link: 'http://worrydream.com/refs/Kay%20-%20Powerful%20Ideas%20Need%20Love%20Too.html',
      readBy: ['101']
    },
    { _id: '205',
      type: 'article',
      title: 'Inquisitive Programming',
      author: ['David Flanagan'],
      link: 'https://medium.com/@__davidflanagan/inquisitive-programming-3a765cc98655#.vtysw22rf',
      readBy: ['102']
    },
    { _id: '206',
      type: 'article',
      title: 'Dynamo: Amazon\'s Highly Available Key-Value Store',
      author: ['Giuseppe DeCandia', 'Deniz Hastorun', 'Madan Jampani', 'Gunavardhan Kakulapati'],
      link: 'http://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf',
      readBy: ['102']
    },
    { _id: '207',
      type: 'quote',
      title: 'You know you\'re in love when you can\'t fall asleep because reality is finally better than your dreams.',
      author: ['Dr. Seuss'],
      link: 'http://www.goodreads.com/author/quotes/61105.Dr_Seuss',
      readBy: ['101']
    }
  ])

  db.collection('usersResources').drop();
  const insertUsersResources = db.collection('usersResources').insertMany([
    { _id: '301',
      user_id: '101',
      resource_id: '201',
      comment: 'book',
      rating: 9,
      tags: ['fiction', 'historical', 'slavery']
    },
    { _id: '302',
      user_id: '102',
      resource_id: '202',
      comment: 'book',
      rating: 8,
      tags: ['fiction', 'philosophical', 'dissapointment', 'love', 'relationships'],
    },
    { _id: '303',
      user_id: '102',
      resource_id: '203',
      comment: 'book',
      rating: 10,
      tags: ['biography', 'classic', 'advice', 'perseverance'],
    },
    { _id: '304',
      user_id: '101',
      resource_id: '204',
      comment: 'article',
      rating: 9,
      tags: ['education', 'technology', 'science', 'pedagogy'],
    },
    { _id: '305',
      user_id: '102',
      resource_id: '205',
      comment: 'article',
      rating: 9,
      tags: ['education', 'technology', 'programming', 'pedagogy'],
    },
    { _id: '306',
      user_id: '102',
      resource_id: '206',
      comment: 'article',
      rating: 10,
      tags: ['technology', 'database', 'amazon', 'dynamo'],
    },
    { _id: '307',
      user_id: '101',
      resource_id: '207',
      comment: 'quote',
      rating: null,
      tags: ['fun', 'life', 'wisdom'],
    }
  ])

  Promise.all([insertUsers, insertResources, insertUsersResources]).then(values => {
    console.log(`${values[0].insertedCount} records inserted into users collection`);
    console.log(`${values[1].insertedCount} records inserted into resouces collection`);
    console.log(`${values[2].insertedCount} records inserted into usersResources collection`);
    db.close();
  });

}).catch((e) => {
  console.log('Unexpected error during DB initialization');
})
