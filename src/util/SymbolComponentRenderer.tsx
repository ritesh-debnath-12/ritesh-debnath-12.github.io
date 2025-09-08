import type { JSX } from "react"

/** 
 * A simple utility function to render an icon component
 * @author Neko
 * @license GPLv3.0
 */
const renderIcon = (iconMap: { [key: string]: React.ComponentType }, iconName: string): JSX.Element | null => {
  const IconComponent = iconMap[iconName]
  return IconComponent ? <IconComponent /> : null
}

export default renderIcon