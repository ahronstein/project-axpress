import React from 'react';
import { arrFolder,arrfile } from './arrs';
import { useState, useEffect } from 'react';
// import { Link, Outlet } from "react-router-dom";
function AppReact() {
 
  const [data, useData] = useState([])
  const [name, setName] = useState()
  const [folder, setFolder] = useState([])
  const [srcContent, setFiles] = useState([])
  const [size, setSize] = useState([])
  const [arrFile, setErrFiles] = useState(arrfile)


  async function GetAll(url) {
    const res = await fetch(url)
    const dataJson = await res.json()
    useData(dataJson)
  }
  useEffect(() => { GetAll("http://localhost:8000") }, [])

  async function getData(url, obj) {
    console.log(obj);
    const res = await fetch(url, obj) 
    const dataJson = await res.json()
    setFolder(dataJson)
  }
 
  return (<div>
    <table>
      <tr>
        <th>Name</th>
        <th>Type</th>
        <th>Operations</th>
      </tr>
      {
        data.map((file, idx) =>
          <tr>
            <td>{file.fileName}</td>
            <td>{file.isDirectory ? "folder" : file.fileName.split('.')[1]}</td>
            {
              file.isDirectory ?
                arrFolder.map((e, i) =>
                  <td>
                    {e.type === 'rename'&& <input onChange={(e) => setName(e.target.value)}></input>}
                    <button onClick={() => {
                       switch (e.type) {
                        case "up":
                          GetAll(`http://localhost:8000${file.path}/../../`)
                          break;

                          case "show":
                            setFiles(`http://localhost:8000${file.path}`, e.obj)
                            break;
                        
                          case "info":
                            setSize(file)
                            break;
                          case "enter":
                            GetAll(`http://localhost:8000${file.path}`);
                     setErrFiles(arrFile,arrFile.push({ type: "up", obj: { method: 'GET' } })) 
                            break;
                            case "delete":
                              getData(`http://localhost:8000/${file.path}`, e.obj)
                            break;
                            case "rename":
                              getData(`http://localhost:8000/${file.path}`, {...e.obj, body : JSON.stringify({ newName  : name})})
                            break;
                         
                        default:
                          getData(`http://localhost:8000/${file.path}`, e.obj);setTimeout(() => {GetAll() }, 0)
                          setErrFiles([...arrfile]); setFiles([]); setSize([]);
                          break;
                      }
            }
                    }>{e.type}</button>
                  </td>)
                : arrFile.map((e, i) =>
                  <td>
                     {e.type === 'rename'&& <input onChange={(e) => setName(e.target.value)}></input>}
                    <button onClick={() => {
                      switch (e.type) {
                        case "up":
                          GetAll(`http://localhost:8000${file.path}/../../`)
                          break;
                          case "rename":
                              getData(`http://localhost:8000/${file.path}`, {...e.obj, body : JSON.stringify({ newName  : name})})
                            break;
                          case "show":
                            setFiles(`http://localhost:8000${file.path}`, e.obj)
                            break;
                        
                          case "info":
                            setSize(file)
                            break;
                         
                        default:
                          getData(`http://localhost:8000/${file.path}`, e.obj);setTimeout(() => {GetAll() }, 0)

                          break;
                      }
                      // setFolder([]); setFiles([]); setSize([]);

                    }
                    }>{e.type}</button>
                  </td>
                )
            }
          </tr>
        )
      }
      <br />
    </table>
    {size.length != 0 && <div>{`name: ${size.fileName} size: ${size.size}Kb  time: ${size.birth}`} </div>}
    {srcContent.length != 0 && <div ><iframe src={srcContent} title="description">{srcContent}</iframe></div>}
    <div>{folder.map((folder) =><p>{ folder.fileName}</p>)}</div>
  </div>)
}
export default AppReact;