"use client";

import { useEffect, useState, type ReactNode } from "react";

type AsyncPageLoader<TProps> = (props: TProps) => Promise<ReactNode>;

type Props<TProps> = {
  load: AsyncPageLoader<TProps>;
  pageProps: TProps;
};

export function AsyncServerPagePreview<TProps>({ load, pageProps }: Props<TProps>) {
  const remountKey = JSON.stringify(pageProps);

  return (
    <AsyncServerPagePreviewInner
      key={remountKey}
      load={load}
      pageProps={pageProps}
    />
  );
}

function AsyncServerPagePreviewInner<TProps>({ load, pageProps }: Props<TProps>) {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let cancelled = false;

    load(pageProps)
      .then((node) => {
        if (!cancelled) {
          setContent(node);
        }
      })
      .catch((cause) => {
        if (!cancelled) {
          setError(cause);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [load, pageProps]);

  if (error) {
    throw error;
  }

  if (!content) {
    return (
      <div className="p-6 text-sm text-stone-500" role="status">
        Cargando página…
      </div>
    );
  }

  return content;
}
