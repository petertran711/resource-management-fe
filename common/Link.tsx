import { FC } from 'react'
import NextLink, { LinkProps } from 'next/link'


const Link: FC<LinkProps> = (props) => {
  return (
    <NextLink {...props}>
      <a style={{color:"inherit"}}>{props.children}</a>
    </NextLink>
  )
}
export default Link
