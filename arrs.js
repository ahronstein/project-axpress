export const arrfile = [
    { type: "info", obj: { method: 'GET' } },
    { type: "show", obj: { method: 'GET' } },
    { 
      type: "rename", obj: {
        method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: "poi" })
      }
    },
    { type: "copy", obj: { method: 'POST' } ,
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
    body:JSON.stringify({ active: "rename", newName: "poi" })
  },
    {
      type: "delete", obj: { method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
       body: JSON.stringify({ folder:false })}
    }
  ]
export const arrFolder = [
    { type: "enter", obj: { method: 'GET' } },
    { type: "show", obj: { method: 'GET' } },
    { 
      type: "rename", obj: {
        method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName: "poi" })
      }
    },
    { type: "up", obj: { method: 'GET' } },
    {
      type: "delete", obj: {   method: 'DELETE',
      headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
       body: JSON.stringify({ folder:true })} 
    }
  ]
