import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { QUIZ_QUESTIONS } from '../lib/quiz';
import { classifyDesignType } from '../lib/designTypes';
import { DEFAULT_AVATAR_ID } from '../lib/avatars';
import { Theme, useTheme } from '../lib/theme';
import { Profile } from '../lib/types';
import { border, radius, space } from '../lib/tokens';

export default function OnboardingQuiz({ onComplete }: { onComplete: (profile: Profile) => void }) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const styles = makeStyles(theme);
  const [index, setIndex] = useState(0);
  const [orderScore, setOrderScore] = useState(0);
  const [intensityScore, setIntensityScore] = useState(0);
  const [scopeScore, setScopeScore] = useState(0);

  const question = QUIZ_QUESTIONS[index];
  const isLast = index === QUIZ_QUESTIONS.length - 1;

  function pick(order: number, intensity: number, scope: number) {
    const nextOrder = orderScore + order;
    const nextIntensity = intensityScore + intensity;
    const nextScope = scopeScore + scope;
    if (isLast) {
      const designTypeId = classifyDesignType(nextOrder, nextIntensity, nextScope);
      onComplete({
        designTypeId,
        orderScore: nextOrder,
        intensityScore: nextIntensity,
        scopeScore: nextScope,
        avatarId: DEFAULT_AVATAR_ID,
        completedAt: new Date().toISOString(),
      });
      return;
    }
    setOrderScore(nextOrder);
    setIntensityScore(nextIntensity);
    setScopeScore(nextScope);
    setIndex((i) => i + 1);
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top + space.space24, paddingBottom: insets.bottom + space.space24 }]}>
      <Text style={styles.progress}>
        {index + 1} / {QUIZ_QUESTIONS.length}
      </Text>
      <Text style={styles.prompt}>{question.prompt}</Text>
      <View style={styles.options}>
        {question.options.map((opt, i) => (
          <Pressable
            key={i}
            style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
            onPress={() => pick(opt.order, opt.intensity, opt.scope)}
          >
            <Text style={styles.optionText}>{opt.text}</Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

function makeStyles(theme: Theme) {
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: theme.bg, paddingHorizontal: space.screenPadding, justifyContent: 'space-between' },
    progress: { color: theme.fgFaint, fontFamily: theme.monoFont, fontSize: 13, letterSpacing: 1 },
    prompt: {
      color: theme.fg,
      fontFamily: theme.displayFont,
      fontSize: 28,
      lineHeight: 36,
      marginTop: space.space24,
    },
    options: { gap: space.space12, marginTop: space.space32 },
    option: {
      borderWidth: border.hairline,
      borderColor: theme.border,
      borderRadius: radius.card,
      paddingHorizontal: space.space16,
      paddingVertical: space.cardPadding,
    },
    optionPressed: { backgroundColor: theme.bgAlt, borderColor: theme.fg },
    optionText: { color: theme.fg, fontSize: 15, lineHeight: 21 },
  });
}
