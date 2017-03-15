const mongo = require('../helpers/mongo')

mongo.connect().then((db) => {

  db.collection('users').drop();
  const insertUsers = db.collection('users').insertMany([
    { _id: '101',
      username: 'kiko',
      name: 'Carlos Villagrán',
      pwdHash: 'baa80ec4e76734d710c5084558bc2d5f',
      read: ['201', '204', '207'],
    },
    { _id: '102',
      username: 'chespirito',
      name: 'Roberto Goméz Bolaños',
      pwdHash: 'ee8406b40b0d49cdffe3e9f6e6634fe9',
      read: ['202', '205']
    },
    { _id: '103',
      username: 'donramon',
      name: 'Ramón Valdés',
      pwdHash: '2ee8d7aa0116c2e0683b9fdca9cd66c0',
      read: ['203', '206']
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
      readBy: ['103']
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
      readBy: ['103']
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
      user_id: '103',
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
      user_id: '103',
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
