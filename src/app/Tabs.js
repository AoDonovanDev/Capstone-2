export default function Tabs({active, tab}){
  return (
    <div className="Search">
      <a className={`tab tab-bordered ${active[0] ? 'tab-active': ''}`} onClick={()=>tab(0)}>Tracks</a> 
      <a className= {`tab tab-bordered ${active[1] ? 'tab-active': ''}`} onClick={()=>tab(1)}>Artists</a> 
      <a className={`tab tab-bordered ${active[2] ? 'tab-active': ''}`} onClick={()=>tab(2)}>Albums</a>
    </div>
    
  )
}