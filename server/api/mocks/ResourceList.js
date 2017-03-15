'use strict'

function getList (req, res, next) {
  res.json([
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
    }
  ])
}

function getLatest (req, res, next) {
  res.json([
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
    { _id: '206',
      type: 'article',
      title: 'Immigration Policies in Europe',
      author: ['David Shae', 'Mark Baron'],
      link: '',
      readBy: ['103']
    }
  ])
}

module.exports = {
  getList: getList,
  getLatest: getLatest
}
