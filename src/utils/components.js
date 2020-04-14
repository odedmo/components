export default [{
    "name": "container-1",
    "type": "container",
    "description": "container description",
    "data_sql": "select * from dual"
  },
  {
    "name": "category-1",
    "type": "category",
    "parent": "container-1",
    "data_sql": "select * from dual",
    "configuration_sql": "select * from dual",
    "global_sql": "select * from dual"
  },
  {
    "name": "grid-1",
    "type": "grid",
    "parent": "category-1",
    "data_sql": "select * from dual"
  },
  {
    "name": "chart-1",
    "type": "chart",
    "parent": "category-1",
    "data_sql": "select * from dual",
    "configuration_sql": "select * from dual"
  },
  {
    "name": "container-2",
    "type": "container",
    "description": "container description",
    "data_sql": "select * from dual"
  },
  {
    "name": "category-2",
    "type": "category",
    "parent": "container-2",
    "data_sql": "select * from dual",
    "configuration_sql": "select * from dual",
    "global_sql": "select * from dual"
  },
  {
    "name": "category-3",
    "type": "category",
    "parent": "container-2",
    "data_sql": "select * from dual",
    "configuration_sql": "select * from dual",
    "global_sql": "select * from dual"
  },
  {
    "name": "grid-2",
    "type": "grid",
    "parent": "category-2",
    "data_sql": "select * from dual"
  },
  {
    "name": "chart-2",
    "type": "chart",
    "parent": "category-2",
    "data_sql": "select * from dual",
    "configuration_sql": "select * from dual"
  },
  {
    "name": "grid-3",
    "type": "grid",
    "parent": "category-3",
    "data_sql": "select * from dual"
  }
]