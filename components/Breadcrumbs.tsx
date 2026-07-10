import { Fragment } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import { Theme, useTheme } from '../lib/theme';
import { space } from '../lib/tokens';

export type Crumb = { label: string; onPress?: () => void };

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const theme = useTheme();
  const styles = makeStyles(theme);

  return (
    <Text style={styles.row}>
      {items.map((crumb, i) => (
        <Fragment key={i}>
          {crumb.onPress ? (
            <Text style={styles.link} onPress={crumb.onPress}>
              {crumb.label}
            </Text>
          ) : (
            <Text style={styles.current}>{crumb.label}</Text>
          )}
          {i < items.length - 1 && <Text style={styles.separator}> / </Text>}
        </Fragment>
      ))}
    </Text>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    row: { marginBottom: space.space20, fontSize: 15 },
    link: { color: theme.fgDim, textDecorationLine: 'underline' },
    current: { color: theme.fg },
    separator: { color: theme.fgFaint },
  });
}
