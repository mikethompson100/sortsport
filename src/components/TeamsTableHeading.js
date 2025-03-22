
export default function TeamsTableHeading(props) {
  const active = props.title === props.activeColumn;
  const className = active ? "top active" : "top";
  const ascend = props.flipDefault? !props.ascend : props.ascend;
  const direction = ascend ? "up" : "down";
  const chevron = active && <span className={`bi bi-chevron-${direction}`}></span>

  return (
    <td className={className}>
      <button onClick={(e) => props.handleColumnClick(props.title)} title={props.title}>
        {props.title}:
        {chevron}
      </button>
    </td>
  )
};