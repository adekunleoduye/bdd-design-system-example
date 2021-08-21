import cn from 'classnames';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';

import styles from './Loading.module.scss';

function Loader({ size }) {
  return (
    <AiOutlineLoading3Quarters className={cn(styles.root, {
      [styles[size]]: size,
    })}
    />
  );
}

function Loading({ size = 'default'}) {

  return <Loader size={size} />;
}

export default Loading;