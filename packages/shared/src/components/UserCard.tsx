export const UserCard = ({userName}: {userName?: string}) => {
   return (
      <div style={{display: 'flex', flexDirection: 'column', gap: '20px', border: '1px solid #000'}}>
         <h3>userName: {userName ?? 'user'}</h3>
         <h3>password: 12*****</h3>
      </div>
   )
}