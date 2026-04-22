import type { ReactElement } from 'react';
import { siteConfig } from './site';

export const socialImageAlt =
  'Quantum Reservoir Computing - interactive essays on observables, dynamics, measurement, and review.';

export const socialImageSize = {
  width: 1200,
  height: 630,
} as const;

interface BrandIconProps {
  compact?: boolean;
}

export function BrandIcon({ compact = false }: BrandIconProps) {
  return (
    <div
      style={{
        alignItems: 'center',
        background: 'linear-gradient(145deg, #f8fcff 0%, #eaf4fc 55%, #f7efe3 100%)',
        color: '#183046',
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          border: '8px solid rgba(37, 95, 147, 0.18)',
          borderRadius: '28%',
          height: '82%',
          position: 'absolute',
          transform: 'rotate(8deg)',
          width: '82%',
        }}
      />
      <div
        style={{
          border: '6px solid rgba(37, 95, 147, 0.3)',
          borderRadius: '50%',
          height: '60%',
          position: 'absolute',
          width: '60%',
        }}
      />
      <div
        style={{
          borderRadius: '50%',
          boxShadow: '0 0 0 16px rgba(109, 149, 188, 0.12)',
          height: '18%',
          position: 'absolute',
          width: '18%',
          background: '#255f93',
        }}
      />
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.82)',
          border: '3px solid rgba(67, 104, 138, 0.12)',
          borderRadius: 999,
          display: 'flex',
          fontSize: compact ? 88 : 140,
          fontWeight: 800,
          letterSpacing: -8,
          padding: compact ? '18px 34px 22px' : '22px 48px 28px',
          position: 'absolute',
        }}
      >
        QRC
      </div>
    </div>
  );
}

export function SocialImage(): ReactElement {
  return (
    <div
      style={{
        background:
          'linear-gradient(135deg, #f8fcff 0%, #edf5fb 42%, #f7efe3 100%)',
        color: '#183046',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'space-between',
        padding: '54px 62px',
        position: 'relative',
        width: '100%',
      }}
    >
      <div
        style={{
          alignSelf: 'flex-start',
          border: '1px solid rgba(37, 95, 147, 0.16)',
          borderRadius: 999,
          color: '#5f7e9f',
          display: 'flex',
          fontSize: 28,
          fontWeight: 700,
          letterSpacing: 4,
          padding: '14px 22px',
          textTransform: 'uppercase',
        }}
      >
        {siteConfig.shortName}
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          maxWidth: 900,
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 76,
            fontWeight: 800,
            letterSpacing: -3.5,
            lineHeight: 1,
          }}
        >
          Quantum Reservoir Computing
        </div>
        <div
          style={{
            color: '#4e677f',
            display: 'flex',
            fontSize: 34,
            lineHeight: 1.28,
            maxWidth: 860,
          }}
        >
          Interactive essays on measurement, observables, backaction, and review
          cards that help the ideas stay with you.
        </div>
      </div>

      <div
        style={{
          alignItems: 'flex-end',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div
          style={{
            display: 'flex',
            gap: 14,
          }}
        >
          {[
            '5-part reading path',
            'Measurement and Readout',
            'Spaced repetition review',
          ].map((item) => (
            <div
              key={item}
              style={{
                background: 'rgba(255, 255, 255, 0.72)',
                border: '1px solid rgba(67, 104, 138, 0.12)',
                borderRadius: 18,
                color: '#314253',
                display: 'flex',
                fontSize: 23,
                padding: '14px 18px',
              }}
            >
              {item}
            </div>
          ))}
        </div>

        <div
          style={{
            color: '#6f8295',
            display: 'flex',
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          eybmits.github.io/qrc-website
        </div>
      </div>
    </div>
  );
}
