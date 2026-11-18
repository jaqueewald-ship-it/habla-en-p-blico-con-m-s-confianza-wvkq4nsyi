migrate(
  (app) => {
    const collection = new Collection({
      name: 'buyers',
      type: 'base',
      listRule: '',
      viewRule: '',
      createRule: '',
      updateRule: null,
      deleteRule: null,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'purchase_date', type: 'date' },
        { name: 'amount', type: 'number' },
        { name: 'currency', type: 'text' },
        { name: 'created', type: 'autodate', onCreate: true, onUpdate: false },
        { name: 'updated', type: 'autodate', onCreate: true, onUpdate: true },
      ],
      indexes: [
        'CREATE INDEX idx_buyers_email ON buyers (email)',
        'CREATE INDEX idx_buyers_created ON buyers (created DESC)',
      ],
    })
    app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('buyers')
    app.delete(collection)
  },
)
